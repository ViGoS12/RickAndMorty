import Header from './components/header'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

import './scss/app.scss'

import CharacterCard from './components/characterCard'
import Modal from './components/UI/Modal'
import useObserver from './hooks/useObserver'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [modalActive, setModalActive] = useState(false)
  const [characters, setCharacters] = useState<Array<Character>>([])
  const [character, setCharacter] = useState<Character>()

  const lastElement: React.RefObject<any> = useRef()

  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const showMore = (id: number) => {
    setCharacter(
      characters.filter((character: Character) => character.id === id)[0]
    )
  }

  const fetchItems = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character`,
        {
          params: {
            page,
          },
        }
      )
      const { results = [] } = data
      setCharacters([...characters, ...results])
      setTotalPage(data.info.pages)
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }
  }

  useObserver(lastElement, page < totalPage, isLoading, () => {
    setPage(page + 1)
  })

  useEffect(() => {
    fetchItems()
  }, [page])

  return (
    <div className='app'>
      <div className='app__container'>
        <Header />
        <div className='app__content' onClick={() => setModalActive(true)}>
          {characters.map((obj) => (
            <CharacterCard key={obj.id} {...obj} onClick={showMore} />
          ))}
        </div>
        <div className='app__endless_scroller' ref={lastElement}>
          Show more characters
        </div>
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
