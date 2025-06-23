import React from 'react';
import { Provider } from 'react-redux';
import { store} from '../redux/store'; 
import SignInScreen from '@/Pages/sign-in';
import Navi from './Navigation';
import HomeArtist from '@/Pages/artists/homeArtist';
import FormHost from '@/Pages/hosters/form';

export default function App() {
  return (
    <Provider store={store}>
      <FormHost />
    </Provider>
  );
}
