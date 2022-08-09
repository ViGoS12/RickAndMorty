import styles from './Filter.module.scss'

import ResetIcon from '../../assets/svg/resetFilter.svg'

import Search from '../search'
import MySelect from './../UI/Select/'

import { LIFESTATUS, GENDER, SPECIES } from '../../constants'

import { RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'

import { setSearchTypeValue, setType } from '../../redux/slices/searchSlice'
import { reset, setFilter } from '../../redux/slices/filterSlice'
import { setPage } from '../../redux/slices/infoSlice'
import { memo, useCallback } from 'react'

const Filter: React.FC = () => {
  const dispatch = useDispatch()
  const { lifeStatus, gender, species } = useSelector(
    (state: RootState) => state.filter
  )
  const { searchTypeValue } = useSelector((state: RootState) => state.search)

  const resetFilters = useCallback(() => {
    dispatch(reset())
    dispatch(setSearchTypeValue(''))
    dispatch(setPage(1))
  }, [])
  const onChange = useCallback((filter: string, value: string) => {
    dispatch(setPage(1))
    dispatch(setFilter({ filter, value }))
  }, [])

  const onClickClear = useCallback(() => {
    dispatch(setSearchTypeValue(''))
  }, [])

  const onChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchTypeValue(event.target.value))
    },
    []
  )

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
      <ul className={styles.filter__content}>
        <li className={styles.filter__item}>
          Status:
          <MySelect
            value={lifeStatus}
            options={LIFESTATUS}
            filter='lifeStatus'
            onChange={onChange}
          />
        </li>
        <li className={styles.filter__item}>
          Gender:
          <MySelect
            value={gender}
            options={GENDER}
            filter='gender'
            onChange={onChange}
          />
        </li>
        <li className={styles.filter__item}>
          Species:
          <MySelect
            value={species}
            options={SPECIES}
            filter='species'
            onChange={onChange}
          />
        </li>
        <li className={styles.filter__item}>
          Type:
          <Search
            searchValue={searchTypeValue}
            placeholder='Type search...'
            clearFunc={onClickClear}
            changeSearch={changeType}
            onChangeInput={onChangeInput}
          />
        </li>
      </ul>
    </div>
  )
}

export default memo(Filter)
