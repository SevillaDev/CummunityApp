// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screen/LoginScreen';
import HomeScreen from './Screen/HomeScreen';
import RegisterScreen from './Screen/RegisterScreen';
import GlobalScreen from './Screen/GlobalScreen';
import Global from './Screen/Global';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login"
         component={LoginScreen}
         options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} 
         options={{
          headerShown: true,
          headerBackVisible: false
        }}/>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Salas" component={GlobalScreen}
          options={{
            headerShown: true,
            headerBackVisible: false
          }} />
           <Stack.Screen name="Global" component={Global} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
