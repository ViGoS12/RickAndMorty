import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IFilterState {
  lifeStatus: string
}

const initialState: IFilterState = {
  lifeStatus: '',
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setLifeStatus(state: IFilterState, action: PayloadAction<string>) {
      state.lifeStatus = action.payload
    },
  },
})

export const { setLifeStatus } = filterSlice.actions

export default filterSlice.reducer
