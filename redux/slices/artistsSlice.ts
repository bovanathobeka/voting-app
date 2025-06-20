import { createSlice } from '@reduxjs/toolkit';

interface ArtistsState {
  name: string;
}

const initialState: ArtistsState = {
  name: '',
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    setArtistName(state, action) {
      state.name = action.payload;
    },
  },
});

export const { setArtistName } = artistsSlice.actions;
export default artistsSlice.reducer;
