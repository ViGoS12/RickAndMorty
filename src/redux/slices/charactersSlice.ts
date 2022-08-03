import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    // increment: (state: any) => {
    //   state.value += 1
    // },
  },
})

// export const { increment } = charactersSlice.actions

export default charactersSlice.reducer
