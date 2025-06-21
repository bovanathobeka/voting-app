import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  uid: string;
  email: string;
  role: 'artist' | 'hoster' | 'voter';
  fullName: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  emailVerified: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  emailVerified: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Sign Up
    signUpStart(state) {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    signUpFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Sign In
    signInStart(state) {
      state.loading = true;
      state.error = null;
    },
    signInSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    signInFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    setEmailVerified(state, action: PayloadAction<boolean>) {
      state.emailVerified = action.payload;
    },

    logout(state) {
      state.user = null;
      state.emailVerified = false;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  signUpStart,
  signUpSuccess,
  signUpFailure,
  signInStart,
  signInSuccess,
  signInFailure,
  logout,
  setEmailVerified,
} = authSlice.actions;

export default authSlice.reducer;
