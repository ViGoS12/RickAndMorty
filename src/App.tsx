import Header from './components/header'
import axios from 'axios'
import { useEffect, useState } from 'react'

import './scss/app.scss'

import CharacterCard from './components/characterCard'
import Modal from './components/UI/Modal'

function App() {
  const [modalActive, setModalActive] = useState(false)
  const [items, setItems] = useState<Array<items>>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchItems = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character`
      )
      const { results = [] } = data
      setItems(results)
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }
  }

  console.log(items)

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div className='app'>
      <div className='app__container'>
        <Header />
        <div className='app__content' onClick={() => setModalActive(true)}>
          {items.map((obj) => (
            <CharacterCard key={obj.id} {...obj} />
          ))}
        </div>
        <Modal active={modalActive} setActive={setModalActive}>
          {<p style={{ color: 'black' }}>Modal</p>}
        </Modal>
      </div>
    </div>
  )
}

export default App
