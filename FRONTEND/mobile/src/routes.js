import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login.js';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';


const RootStack = createStackNavigator();

export default function Routes() {
    return (
      <NavigationContainer>
         <RootStack.Navigator initialRouteName="Login"
         headerMode="none">
          <RootStack.Screen name="Login" component={Login} />
          <RootStack.Screen name="Cadastro" component={Cadastro} />
          <RootStack.Screen name="Home" component={Home} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }