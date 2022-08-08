import styles from './Filter.module.scss'

import ResetIcon from '../../assets/svg/resetFilter.svg'

import { useDispatch, useSelector } from 'react-redux'

import { reset, setFilter } from '../../redux/slices/filterSlice'
import MySelect from './../UI/Select/'
import { LIFESTATUS, GENDER, SPECIES } from '../../constants'
import { RootState } from '../../redux/store'
import Search from '../search'
import { setSearchTypeValue, setType } from '../../redux/slices/searchSlice'

const Filter: React.FC = () => {
  const dispatch = useDispatch()
  const { lifeStatus, gender, species } = useSelector(
    (state: RootState) => state.filter
  )
  const { searchTypeValue } = useSelector((state: RootState) => state.search)

  const resetFilters = () => {
    dispatch(reset())
    dispatch(setSearchTypeValue(''))
  }
  const onChange = (filter: string, value: string) => {
    dispatch(setFilter({ filter, value }))
  }

  const onClickClear = () => {
    dispatch(setSearchTypeValue(''))
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTypeValue(event.target.value))
  }

  const changeType = () => {
    dispatch(setType(searchTypeValue))
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
        <Search
          searchValue={searchTypeValue}
          clearFunc={onClickClear}
          changeSearch={changeType}
          onChangeInput={onChangeInput}
        />
      </div>
    </div>
  )
}

export default Filter
