import Header from './components/header'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

import './scss/app.scss'

import CharacterCard from './components/characterCard'
import Modal from './components/UI/Modal'
import useObserver from './hooks/useObserver'
import ReactLoading from 'react-loading'
import Filter from './components/filter/index'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { setCharacters } from './redux/slices/charactersSlice'

function App() {
  const dispatch = useDispatch()
  const { characters } = useSelector((state: RootState) => state.character)
  const status = useSelector((state: RootState) => state.filter.lifeStatus)

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

  console.log(status)

  const fetchCharacters = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character`,
        {
          params: {
            page,
            status,
          },
        }
      )
      const { results = [] } = data

      dispatch(setCharacters([...results]))
      console.log(data)
      setTotalPage(data.info.pages)
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }
  }

  console.log(characters)

  useObserver(lastElement, page < totalPage, isLoading, () => {
    setPage(page + 1)
  })

  useEffect(() => {
    fetchCharacters()
  }, [status])

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
