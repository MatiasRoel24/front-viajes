import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Account from '../screens/Account'
import { colors } from '../utils/constants';

export default function AccountNavigation() {
    const Stack = createNativeStackNavigator();
    
    return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: colors.black,
      }
    }
    }>
        <Stack.Screen options={{headerTintColor: colors.white}} name='Mi perfil' component={Account}/>
    </Stack.Navigator>
  )
}