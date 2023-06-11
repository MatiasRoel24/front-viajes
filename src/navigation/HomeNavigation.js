import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home';

export default function HomeNavigation() {
    const Stack = createNativeStackNavigator();
    
    return (
    <Stack.Navigator>
        <Stack.Screen name='Inicio' component={Home}/>
    </Stack.Navigator>
  )
}