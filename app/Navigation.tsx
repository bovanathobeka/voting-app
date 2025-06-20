import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUpScreen from '@/Pages/sign-up';
import SignInScreen from '@/Pages/sign-in';
import HomeHosters from '@/Pages/hosters/home';
import HomeArtist from '@/Pages/artists/homeArtist';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeHosters" component={HomeHosters} />
        <Stack.Screen name="HomeArtist" component={HomeArtist} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
