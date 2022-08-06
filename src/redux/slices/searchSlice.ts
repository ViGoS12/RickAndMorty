import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ISearchState {
  [key: string]: string
}

const initialState: ISearchState = {
  name: '',
  searchValue: '',
  type: '',
  TypeValue: '',
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

    setWhatDoISearch(
      state: ISearchState,
      action: PayloadAction<{ whatDoISearch: string; value: string }>
    ) {
      state[action.payload.whatDoISearch] = action.payload.value
    },
  },
})

export const { setName, setSearchValue } = filterSlice.actions

export default filterSlice.reducer
