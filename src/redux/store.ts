import { configureStore } from '@reduxjs/toolkit'
import characters from './slices/charactersSlice'
import filter from './slices/filterSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    characters,
    filter,
  },
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
