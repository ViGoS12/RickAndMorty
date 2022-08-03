import { configureStore } from '@reduxjs/toolkit'
import characters from './slices/filterSlice'
import filter from './slices/filterSlice'

export const store = configureStore({
  reducer: {
    characters,
    filter,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
