import Header from './components/header'

import './scss/app.scss'

import CharacterCard from './components/characterCard'
import Skeleton from './components/characterCard/Skeleton'
import Modal from './components/UI/Modal'
import Filter from './components/filter/'
import Pagination from './components/UI/Pagination'

import { useCallback, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { useAppDispatch, RootState } from './redux/store'
import { fetchCharacters, setCharacter } from './redux/slices/charactersSlice'
import { setPage } from './redux/slices/infoSlice'

import NoData from './pages/NoData'
import { fetchEpisodes } from './redux/slices/episodesInfoSlice'

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

  const showMore = useCallback((id: number) => {
    dispatch(setCharacter(id))
  }, [])

  const handleChangePage = useCallback((page: number) => {
    dispatch(setPage(page))
  }, [])

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
  const getEpisodes = async () => {
    dispatch(fetchEpisodes())
  }

  useEffect(() => {
    getEpisodes()
  }, [])

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
