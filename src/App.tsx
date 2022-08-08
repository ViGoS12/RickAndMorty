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

function App() {
  const dispatch = useAppDispatch()
  const { characters, loadingStatus, character } = useSelector(
    (state: RootState) => state.characters
  )
  const status = useSelector((state: RootState) => state.filter.lifeStatus)
  const { gender, species } = useSelector((state: RootState) => state.filter)
  const { name, type } = useSelector((state: RootState) => state.search)

  const [modalActive, setModalActive] = useState(false)

  const lastElement: React.RefObject<any> = useRef()

  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(42)

  const showMore = (id: number) => {
    dispatch(setCharacter(id))
  }

  console.log(characters)

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
  }, [name, status, gender, species, type])

  return (
    <div className='app'>
      <div className='app__container'>
        <Header />
        <Filter />

        {loadingStatus === 'error' ? (
          <NoData />
        ) : (
          <>
            <Pagination totalPage={totalPage} />
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
