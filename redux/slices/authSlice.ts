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
    signOut(state) {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { signUpStart, signUpSuccess, signUpFailure, signOut } = authSlice.actions;
export default authSlice.reducer;
