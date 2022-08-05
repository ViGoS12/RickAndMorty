import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface ICharacterState {
  characters: Character[]
  character: Character
  loadingStatus: 'loading' | 'success' | 'error'
}

const initialState: ICharacterState = {
  characters: [],
  character: {
    id: 1,
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    origin: {
      name: '',
      url: '',
    },
    location: {
      name: '',
      url: '',
    },
    image: '',
    episode: [''],
    url: '',
    created: '',
  },
  loadingStatus: 'loading',
}

export const fetchCharacters = createAsyncThunk<Character[], Filter>(
  'character/fetchCharactersStatus',
  async (params) => {
    const { page, name, status, species, gender } = params
    // const { page, name, status, species, type, gender } = params

    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/character`,
      {
        params: {
          page,
          name,
          status,
          species,
          // type,
          gender,
        },
      }
    )

    const { results } = data
    return results
  }
)

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
    setCharacter(state: ICharacterState, action: PayloadAction<number>) {
      state.character = state.characters.filter(
        (character: Character) => character.id === action.payload
      )[0]
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

export const { setCharacters, setCharacter } = charactersSlice.actions

export default charactersSlice.reducer
