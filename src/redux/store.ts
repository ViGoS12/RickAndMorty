import { configureStore } from '@reduxjs/toolkit'
import characters from './slices/charactersSlice'
import filter from './slices/filterSlice'
import search from './slices/searchSlice'
import info from './slices/infoSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    characters,
    filter,
    search,
    info,
  },
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
