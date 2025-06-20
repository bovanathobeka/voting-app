import { configureStore } from '@reduxjs/toolkit';
import hostersReducer from './slices/hostersSlice';
import artistsReducer from './slices/artistsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    hosters: hostersReducer,
    artists: artistsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
