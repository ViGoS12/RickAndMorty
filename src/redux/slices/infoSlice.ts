import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchCharacters } from './charactersSlice'

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
  extraReducers: (builder) => {
    // builder.addCase(fetchCharacters.pending, (state) => {})
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.totalPage = action.payload.info.pages
    })
    builder.addCase(fetchCharacters.rejected, (state, action) => {
      state.totalPage = 1
    })
  },
})

export const { setPage, setTotalPage } = infoSlice.actions

export default infoSlice.reducer
