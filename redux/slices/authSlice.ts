import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: { email: string; token?: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInStart(state) {
      state.loading = true;
      state.error = null;
    },
    signInSuccess(state, action: PayloadAction<{ email: string; token?: string }>) {
      state.loading = false;
      state.user = action.payload;
    },
    signInFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    signOut(state) {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, signOut } = authSlice.actions;
export default authSlice.reducer;
