import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import NavigationService from './NavigationService';
import { stacks } from '../utility/screens';
import AuthStack from './AuthStack';
import { ThemeProvider } from '../context/ThemeContext';
import BottomTabStack from './BottomTabStack';

const Stack = createStackNavigator();

const RootNasvigation: FC = () => {
  return (
    <NavigationContainer
      ref={ref => NavigationService.setTopLevelNavigator(ref)}
      onStateChange={() => {
        NavigationService.onStateChange(); // Notify screen change
      }}
    >
      <ThemeProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={stacks.authStack} component={AuthStack} />
          <Stack.Screen name={stacks.bottomTabStack} component={BottomTabStack} />
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default RootNasvigation;
