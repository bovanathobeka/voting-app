import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import SignUpScreen from '@/Pages/sign-up';
// import Navigation from './Navigation'; 

export default function App() {
  return (
    <Provider store={store}>
      <SignUpScreen />
    </Provider>
  );
}
