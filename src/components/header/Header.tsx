import styles from './Header.module.scss'

import Logo from '../../assets/svg/logo.svg'

import Search from './../search/'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import { setName, setSearchNameValue } from '../../redux/slices/searchSlice'

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const { searchNameValue } = useSelector((state: RootState) => state.search)

  const onClickClear = () => {
    dispatch(setSearchNameValue(''))
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchNameValue(event.target.value))
  }

  const changeName = () => {
    dispatch(setName(searchNameValue))
  }

  return (
    <div className={styles.header}>
      <img className={styles.header__logo} src={Logo} alt='' />
      <Search
        placeholder='Name search...'
        searchValue={searchNameValue}
        clearFunc={onClickClear}
        changeSearch={changeName}
        onChangeInput={onChangeInput}
      />
      <ul className={styles.header__list}>
        <li className={styles.header__item}>feature 1</li>
        <li className={styles.header__item}>feature 2</li>
        <li className={styles.header__item}>feature 3</li>
        <li className={styles.header__item}>feature 4</li>
        <li className={styles.header__item}>feature 5</li>
      </ul>
    </div>
  )
}

export default Header
