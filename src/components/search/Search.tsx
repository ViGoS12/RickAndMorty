import { useEffect, useRef, useState } from 'react'
import styles from './Search.module.scss'
import ClearIcon from '../../assets/svg/clearButton.svg'
import useDebounce from './../../hooks/useDebounce'

const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedValue = useDebounce<string>(value, 500)

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const onClickClear = () => {
    setValue('')
    inputRef.current?.focus()
  }

  useEffect(() => {
    console.log(value)
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
