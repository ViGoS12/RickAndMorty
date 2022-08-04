import Header from './components/header'

import './scss/app.scss'

import { useEffect, useRef, useState } from 'react'

import CharacterCard from './components/characterCard'
import Skeleton from './components/characterCard/Skeleton'
import Modal from './components/UI/Modal'
import Filter from './components/filter/index'

import useObserver from './hooks/useObserver'

import ReactLoading from 'react-loading'

import { useSelector } from 'react-redux'
import { useAppDispatch, RootState } from './redux/store'
import { fetchCharacters, setCharacters } from './redux/slices/charactersSlice'

function App() {
  const dispatch = useAppDispatch()
  const { characters, loadingStatus } = useSelector(
    (state: RootState) => state.characters
  )
  const status = useSelector((state: RootState) => state.filter.lifeStatus)
  const { name } = useSelector((state: RootState) => state.filter)

  const [modalActive, setModalActive] = useState(false)

  const [character, setCharacter] = useState<Character>()

  const lastElement: React.RefObject<any> = useRef()

  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(42)

  const showMore = (id: number) => {
    setCharacter(
      characters.filter((character: Character) => character.id === id)[0]
    )
  }

  console.log(loadingStatus)

  const getCharacters = async () => {
    dispatch(fetchCharacters({ page, name, status }))

    // setTotalPage(data.info.pages)
  }

  useObserver(
    lastElement,
    page < totalPage,
    loadingStatus === 'success' ? false : true,
    () => {
      setPage(page + 1)
    }
  )

  useEffect(() => {
    getCharacters()
  }, [name, status])

  return (
    <div className='app'>
      <div className='app__container'>
        <Header />
        <Filter />
        {/* {isLoading ? (
          <div className='app__loading'>
            <ReactLoading
              type='bubbles'
              color='white'
              height={'5%'}
              width={'5%'}
            />
          </div>
        ) : ( */}
        <div className='app__content'>
          {loadingStatus === 'loading'
            ? [...new Array(9)].map((_, i) => <Skeleton key={i} />)
            : characters.map((obj) => (
                <div key={obj.id} onClick={() => setModalActive(true)}>
                  <CharacterCard {...obj} onClick={showMore} />
                </div>
              ))}
        </div>
        {/* )} */}
        {page < totalPage && (
          <div className='app__endless_scroller' ref={lastElement}>
            Show more
            <ReactLoading
              type='cylon'
              color='white'
              height='30px'
              width='30px'
            />
          </div>
        )}

        {character && (
          <Modal
            active={modalActive}
            setActive={setModalActive}
            pickedCharacter={character}
          />
        )}
      </div>
    </div>
  )
}

export default App
