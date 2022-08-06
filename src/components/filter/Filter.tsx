import styles from './Filter.module.scss'

import ResetIcon from '../../assets/svg/resetFilter.svg'

import { useDispatch, useSelector } from 'react-redux'

import { reset, setFilter } from '../../redux/slices/filterSlice'
import MySelect from './../UI/Select/'
import { LIFESTATUS, GENDER, SPECIES } from '../../constants'
import { RootState } from '../../redux/store'
import Search from '../search'

const Filter: React.FC = () => {
  const dispatch = useDispatch()
  const { lifeStatus, gender, species } = useSelector(
    (state: RootState) => state.filter
  )

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
          value={lifeStatus}
          options={LIFESTATUS}
          filter='lifeStatus'
          onChange={onChange}
        />
        Gender:
        <MySelect
          value={gender}
          options={GENDER}
          filter='gender'
          onChange={onChange}
        />
        Species:
        <MySelect
          value={species}
          options={SPECIES}
          filter='species'
          onChange={onChange}
        />
        Type:
        <Search />
      </div>
    </div>
  )
}

export default Filter
