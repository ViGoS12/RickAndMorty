import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IFilterState {
  [key: string]: string
}

const initialState: IFilterState = {
  lifeStatus: '',
  gender: '',
  species: '',
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter(
      state: IFilterState,
      action: PayloadAction<{ filter: string; value: string }>
    ) {
      state[action.payload.filter] = action.payload.value
    },

    reset: (state: IFilterState) => (state = initialState),
  },
})

export const { setFilter, reset } = filterSlice.actions

export default filterSlice.reducer
