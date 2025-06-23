import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../Pages/sign-in';
import SignUpScreen from '../Pages/sign-up';
import HomeHosters from '../Pages/hosters/home';

const Stack = createNativeStackNavigator();

export default function Navi() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeHosters" component={HomeHosters} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
