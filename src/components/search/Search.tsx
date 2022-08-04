import { useEffect, useRef, useState } from 'react'
import styles from './Search.module.scss'
import ClearIcon from '../../assets/svg/clearButton.svg'
import useDebounce from './../../hooks/useDebounce'
import { useDispatch } from 'react-redux'
import { setName } from '../../redux/slices/filterSlice'

const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedValue = useDebounce<string>(value, 500)
  const dispatch = useDispatch()

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const onClickClear = () => {
    setValue('')
    inputRef.current?.focus()
  }

  useEffect(() => {
    dispatch(setName(value))
  }, [debouncedValue])

  return (
    <div className={styles.search}>
      <div className={styles.search__wrapper}>
        <input
          ref={inputRef}
          value={value}
          onChange={onChangeInput}
          type='text'
          placeholder='Name search...'
          className={styles.search__input}
        />

        {value && (
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
