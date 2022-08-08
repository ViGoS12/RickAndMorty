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
import { fetchCharacters, setCharacter } from './redux/slices/charactersSlice'
import NoData from './pages/NoData'
import Pagination from './components/UI/Pagination'
import { setPage } from './redux/slices/infoSlice'

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

  const lastElement: React.RefObject<any> = useRef()

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

    // setTotalPage(data.info.pages)
  }

  // useObserver(
  //   lastElement,
  //   page < totalPage,
  //   loadingStatus === 'success' ? false : true,
  //   () => {
  //     setPage(page + 1)
  //   }
  // )

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
