import Header from './components/header'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

import './scss/app.scss'

import CharacterCard from './components/characterCard'
import Modal from './components/UI/Modal'
import useObserver from './hooks/useObserver'
import ReactLoading from 'react-loading'
import Filter from './components/filter/index'
import { useSelector } from 'react-redux'
import { useAppDispatch, RootState } from './redux/store'
import { fetchCharacters, setCharacters } from './redux/slices/charactersSlice'

function App() {
  const dispatch = useAppDispatch()
  const { characters } = useSelector((state: RootState) => state.characters)
  const status = useSelector((state: RootState) => state.filter.lifeStatus)
  const { name } = useSelector((state: RootState) => state.filter)

  const [isLoading, setIsLoading] = useState(true)
  const [modalActive, setModalActive] = useState(false)

  const [character, setCharacter] = useState<Character>()

  const lastElement: React.RefObject<any> = useRef()

  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const showMore = (id: number) => {
    setCharacter(
      characters.filter((character: Character) => character.id === id)[0]
    )
  }

  const getCharacters = async () => {
    dispatch(fetchCharacters({ page, name, status }))

    // setTotalPage(data.info.pages)
  }

  useObserver(lastElement, page < totalPage, isLoading, () => {
    setPage(page + 1)
  })

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
          {characters.map((obj) => (
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
