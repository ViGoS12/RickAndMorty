import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IFilterState {
  name: string
  lifeStatus: string
  searchValue: string
}

const initialState: IFilterState = {
  name: '',
  lifeStatus: '',
  searchValue: '',
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setName(state: IFilterState, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setLifeStatus(state: IFilterState, action: PayloadAction<string>) {
      state.lifeStatus = action.payload
    },
    setSearchValue(state: IFilterState, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },

    // reset: () => initialState,
  },
})

export const { setName, setLifeStatus, setSearchValue } = filterSlice.actions

export default filterSlice.reducer
