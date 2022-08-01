import Header from './components/header'
import axios from 'axios'
import { useEffect, useState } from 'react'

import './scss/app.scss'

import CharacterCard from './components/characterCard'

function App() {
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
        <div className='app__content'>
          {items.map((obj) => (
            <CharacterCard key={obj.id} {...obj} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
