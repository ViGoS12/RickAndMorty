import { configureStore } from '@reduxjs/toolkit'
import character from './slices/charactersSlice'
import filter from './slices/filterSlice'

export const store = configureStore({
  reducer: {
    character,
    filter,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
