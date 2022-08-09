import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface IEpisodesInfoState {
  countEpisodes: number
}

const initialState: IEpisodesInfoState = {
  countEpisodes: 1,
}
interface IRequest {
  info: Info
  results: ResultsEpisodes
}

export const fetchEpisodes = createAsyncThunk<IRequest>(
  'episodes/fetchEpisodesStatus',
  async () => {
    const { data } = await axios.get(`https://rickandmortyapi.com/api/episode`)
    return data
  }
)

export const episodesInfo = createSlice({
  name: 'episodes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEpisodes.fulfilled, (state, action) => {
      state.countEpisodes = action.payload.info.count
    })
  },
})

export default episodesInfo.reducer
