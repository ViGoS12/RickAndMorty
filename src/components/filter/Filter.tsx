import styles from './Filter.module.scss'

import ResetIcon from '../../assets/svg/resetFilter.svg'

import { useDispatch } from 'react-redux'

import { reset, setFilter } from '../../redux/slices/filterSlice'
import MySelect from './../UI/Select/'
import { LIFESTATUS, GENDER, SPECIES } from '../../constants'

const Filter: React.FC = () => {
  const dispatch = useDispatch()

  const resetFilters = () => {
    dispatch(reset())
  }
  const onChange = (filter: string, value: string) => {
    dispatch(setFilter({ filter, value }))
  }

  return (
    <div className={styles.filter}>
      <div className={styles.filter__title}>
        Filters{' '}
        <img
          className={styles.filter__btn}
          src={ResetIcon}
          alt=''
          onClick={resetFilters}
        />
      </div>
      <div className={styles.filter__content}>
        Status:
        <MySelect
          options={LIFESTATUS}
          filter='lifeStatus'
          onChange={onChange}
        />
        Gender:
        <MySelect options={GENDER} filter='gender' onChange={onChange} />
        Species:
        <MySelect options={SPECIES} filter='species' onChange={onChange} />
      </div>
    </div>
  )
}

export default Filter
