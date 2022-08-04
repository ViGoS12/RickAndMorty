import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IFilterState {
  name: string
  lifeStatus: string
}

const initialState: IFilterState = {
  name: '',
  lifeStatus: '',
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
  },
})

export const { setName, setLifeStatus } = filterSlice.actions

export default filterSlice.reducer
