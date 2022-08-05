import { useEffect, useRef } from 'react'
import styles from './Search.module.scss'
import ClearIcon from '../../assets/svg/clearButton.svg'
import useDebounce from './../../hooks/useDebounce'
import { useDispatch, useSelector } from 'react-redux'
import { setName, setSearchValue } from '../../redux/slices/searchSlice'
import { RootState } from '../../redux/store'

const Search: React.FC = () => {
  const dispatch = useDispatch()
  const { searchValue } = useSelector((state: RootState) => state.search)

  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedValue = useDebounce<string>(searchValue, 500)

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(event.target.value))
  }

  const onClickClear = () => {
    dispatch(setSearchValue(''))
    inputRef.current?.focus()
  }

  useEffect(() => {
    dispatch(setName(searchValue))
  }, [debouncedValue])

  return (
    <div className={styles.search}>
      <div className={styles.search__wrapper}>
        <input
          ref={inputRef}
          value={searchValue}
          onChange={onChangeInput}
          type='text'
          placeholder='Name search...'
          className={styles.search__input}
        />

        {searchValue && (
          <img
            className={styles.search__img}
            src={ClearIcon}
            alt='Clear button'
            onClick={onClickClear}
          />
        )}
      </div>
    </div>
  )
}

export default Search
