import { configureStore } from '@reduxjs/toolkit'
import characters from './slices/charactersSlice'
import filter from './slices/filterSlice'
import search from './slices/searchSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    characters,
    filter,
    search,
  },
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
