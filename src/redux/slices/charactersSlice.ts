import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface ICharacterState {
  characters: Character[]
  loadingStatus: 'loading' | 'success' | 'error'
}

export const fetchCharacters = createAsyncThunk<Character[], Filter>(
  'character/fetchCharactersStatus',
  async (params) => {
    // const { page, name, status, species, type, gender } = params
    const { page, name, status } = params
    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/character`,
      {
        params: {
          page,
          name,
          status,
          // species,
          // type,
          // gender,
        },
      }
    )
    console.log(data)
    const { results } = data
    return results
  }
)

const initialState: ICharacterState = {
  characters: [],
  loadingStatus: 'loading',
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

  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.pending, (state, action) => {
      state.loadingStatus = 'loading'
      state.characters = []
    })
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.loadingStatus = 'success'
      state.characters = action.payload
    })
    builder.addCase(fetchCharacters.rejected, (state, action) => {
      state.loadingStatus = 'error'
      state.characters = []
    })
  },
})

export const { setCharacters } = charactersSlice.actions

export default charactersSlice.reducer
