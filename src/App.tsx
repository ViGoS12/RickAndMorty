import Header from './components/header'

import './scss/app.scss'

import CharacterCard from './components/characterCard'
import Skeleton from './components/characterCard/Skeleton'
import Modal from './components/UI/Modal'
import Filter from './components/filter/index'
import Pagination from './components/UI/Pagination'

import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { useAppDispatch, RootState } from './redux/store'
import { fetchCharacters, setCharacter } from './redux/slices/charactersSlice'
import { setPage } from './redux/slices/infoSlice'

import NoData from './pages/NoData'

function App() {
  const dispatch = useAppDispatch()
  const { characters, loadingStatus, character } = useSelector(
    (state: RootState) => state.characters
  )
  const status = useSelector((state: RootState) => state.filter.lifeStatus)
  const { gender, species } = useSelector((state: RootState) => state.filter)
  const { name, type } = useSelector((state: RootState) => state.search)
  const { page, totalPage } = useSelector((state: RootState) => state.info)

  const [modalActive, setModalActive] = useState(false)

  const showMore = (id: number) => {
    dispatch(setCharacter(id))
  }

  const handleChangePage = (page: number) => {
    dispatch(setPage(page))
  }

  const getCharacters = async () => {
    dispatch(
      fetchCharacters({
        page,
        name,
        status,
        gender,
        species,
        type,
      })
    )
  }

  useEffect(() => {
    getCharacters()
  }, [page, name, status, gender, species, type])

  return (
    <div className='app'>
      <div className='app__container'>
        <Header />
        <Filter />
        {loadingStatus === 'error' ? (
          <NoData />
        ) : (
          <>
            <Pagination onChange={handleChangePage} totalPage={totalPage} />
            <div className='app__content'>
              {loadingStatus === 'loading'
                ? [...new Array(9)].map((_, i) => <Skeleton key={i} />)
                : characters.map((obj) => (
                    <div key={obj.id} onClick={() => setModalActive(true)}>
                      <CharacterCard {...obj} onClick={showMore} />
                    </div>
                  ))}
            </div>
          </>
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
