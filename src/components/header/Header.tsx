import styles from './Header.module.scss'
import Logo from '../../assets/svg/logo.svg'
import Search from './../search/'

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <img className={styles.header__logo} src={Logo} alt='' />
      <Search />
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
