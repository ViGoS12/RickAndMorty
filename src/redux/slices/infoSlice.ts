import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IInfoState {
  page: number
  totalPage: number
}

const initialState: IInfoState = {
  page: 1,
  totalPage: 1,
}

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setPage(state: IInfoState, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setTotalPage(state: IInfoState, action: PayloadAction<number>) {
      state.totalPage = action.payload
    },
  },
})

export const { setPage, setTotalPage } = infoSlice.actions

export default infoSlice.reducer
