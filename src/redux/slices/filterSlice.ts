import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // increment: (state: any) => {
    //   state.value += 1
    // },
  },
})

// export const { increment } = filterSlice.actions

export default filterSlice.reducer
