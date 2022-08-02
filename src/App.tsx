import Header from './components/header'
import axios from 'axios'
import { useEffect, useState } from 'react'

import './scss/app.scss'

import CharacterCard from './components/characterCard'
import Modal from './components/UI/Modal'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [modalActive, setModalActive] = useState(false)
  const [characters, setCharacters] = useState<Array<Character>>([])
  const [character, setCharacter] = useState<Character>()

  const showMore = (id: number) => {
    setCharacter(
      characters.filter((character: Character) => character.id === id)[0]
    )
  }

  const fetchItems = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character`
      )
      const { results = [] } = data
      setCharacters(results)
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }
  }

  // console.log(characters)

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div className='app'>
      <div className='app__container'>
        <Header />
        <div className='app__content' onClick={() => setModalActive(true)}>
          {characters.map((obj) => (
            <CharacterCard key={obj.id} {...obj} onClick={showMore} />
          ))}
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
