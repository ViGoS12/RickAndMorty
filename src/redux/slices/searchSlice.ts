import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ISearchState {
  name: string
  searchValue: string
}

const initialState: ISearchState = {
  name: '',
  searchValue: '',
}

export const filterSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setName(state: ISearchState, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setSearchValue(state: ISearchState, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
  },
})

export const { setName, setSearchValue } = filterSlice.actions

export default filterSlice.reducer
