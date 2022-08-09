import { memo, useCallback, useEffect, useRef } from 'react'
import styles from './Search.module.scss'
import ClearIcon from '../../assets/svg/clearButton.svg'
import useDebounce from './../../hooks/useDebounce'

interface ISearchProps {
  searchValue: string
  placeholder: string
  clearFunc: () => void
  changeSearch: () => void
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Search: React.FC<ISearchProps> = ({
  searchValue,
  placeholder,
  clearFunc,
  changeSearch,
  onChangeInput,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedValue = useDebounce<string>(searchValue, 500)

  const onClickClear = useCallback(() => {
    clearFunc()
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    changeSearch()
  }, [debouncedValue])

  return (
    <div className={styles.search}>
      <div className={styles.search__wrapper}>
        <input
          ref={inputRef}
          value={searchValue}
          onChange={onChangeInput}
          type='text'
          placeholder={placeholder}
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

export default memo(Search)
