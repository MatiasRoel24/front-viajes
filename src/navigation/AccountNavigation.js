import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Account from '../screens/Account'

export default function AccountNavigation() {
    const Stack = createNativeStackNavigator();
    
    return (
    <Stack.Navigator>
        <Stack.Screen name='Mi perfil' component={Account}/>
    </Stack.Navigator>
  )
}