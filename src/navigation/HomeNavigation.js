import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home';
import { colors } from '../utils/constants';


export default function HomeNavigation() {
    const Stack = createNativeStackNavigator();
    
    return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: colors.black,
      },
    }
    }>
        <Stack.Screen options={{headerTintColor: colors.white}} name='Inicio' component={Home}/>
    </Stack.Navigator>
  )
}