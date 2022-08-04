import styles from './Filter.module.scss'
import './select.scss'

import ResetIcon from '../../assets/svg/resetFilter.svg'

import Select, { OnChangeValue } from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { setLifeStatus } from '../../redux/slices/filterSlice'

interface IOption {
  value: string
  label: string
}

const statusOptions: IOption[] = [
  { value: '', label: 'None' },
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' },
]

const Filter: React.FC = () => {
  const dispatch = useDispatch()
  const { lifeStatus } = useSelector((state: RootState) => state.filter)

  const getValue = () => {
    return lifeStatus
      ? statusOptions.find((v) => v.value === lifeStatus)
      : 'none'
  }

  const onChange = (newValue: OnChangeValue<any, boolean>) => {
    dispatch(setLifeStatus(newValue?.value))
  }

  const resetFilters = () => {
    dispatch(setLifeStatus(''))
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
        <Select
          classNamePrefix='select'
          onChange={onChange}
          value={getValue()}
          options={statusOptions}
          placeholder='Choose status...'
          isSearchable={false}
        />
      </div>
    </div>
  )
}

export default Filter
