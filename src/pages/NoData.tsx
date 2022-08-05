import noData from '../assets/svg/noData.svg'
import styles from './scss/NoData.module.scss'

const NoData = () => {
  return (
    <div className={styles.noData}>
      <div className={styles.noData__content}>
        <img className={styles.noData__img} src={noData} alt='' />
        <div className={styles.noData__title}>No data</div>
      </div>
    </div>
  )
}

export default NoData
