import { createSlice } from '@reduxjs/toolkit';

interface HostersState {
  name: string;
}

const initialState: HostersState = {
  name: '',
};

const hostersSlice = createSlice({
  name: 'hosters',
  initialState,
  reducers: {
    setHosterName(state, action) {
      state.name = action.payload;
    },
  },
});

export const { setHosterName } = hostersSlice.actions;
export default hostersSlice.reducer;
