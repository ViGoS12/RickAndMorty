import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ISearchState {
  [key: string]: string
}

const initialState: ISearchState = {
  name: '',
  searchNameValue: '',
  type: '',
  searchTypeValue: '',
}

export const filterSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setName(state: ISearchState, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setSearchNameValue(state: ISearchState, action: PayloadAction<string>) {
      state.searchNameValue = action.payload
    },
    setType(state: ISearchState, action: PayloadAction<string>) {
      state.type = action.payload
    },
    setSearchTypeValue(state: ISearchState, action: PayloadAction<string>) {
      state.searchTypeValue = action.payload
    },
  },
})

export const { setName, setSearchNameValue, setType, setSearchTypeValue } =
  filterSlice.actions

export default filterSlice.reducer
