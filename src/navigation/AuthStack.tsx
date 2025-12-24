import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screen } from '../utility/screens';
import SplashScreen from '../screens/splashScreen/SplashScreen';
import SignupScreen from '../screens/AuthModule/SignupScreen/SignupScreen';
import ForgotPasswordScreen from '../screens/AuthModule/ForgotPasswordScreen/ForgotPasswordScreen';
import Login from '../screens/AuthModule/LoginScreen/Login';

const Stack = createStackNavigator();

const AuthStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={screen.splashScreen} component={SplashScreen} />
      <Stack.Screen name={screen.login} component={Login} />
      <Stack.Screen name={screen.forgotPasswordScreen} component={ForgotPasswordScreen}/>
      <Stack.Screen name={screen.signUpScreen} component={SignupScreen}/>
    </Stack.Navigator>
  );
};

export default AuthStack;
