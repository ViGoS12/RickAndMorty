import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface ICharacterState {
  characters: Array<Character>
  status: string
}

// export const fetchCharacters = createAsyncThunk(
//   'character/fetchCharactersStatus',
//   async (params) => {
//     const { page } = params
//     const { data } = await axios.get(
//       `https://rickandmortyapi.com/api/character`,
//       {
//         params: {
//           page,
//         },
//       }
//     )
//     return data
//   }
// )

const initialState: ICharacterState = {
  characters: [],
  status: 'loading',
}

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters(
      state: ICharacterState,
      action: PayloadAction<Array<Character>>
    ) {
      state.characters = action.payload
    },
  },
})

export const { setCharacters } = charactersSlice.actions

export default charactersSlice.reducer
