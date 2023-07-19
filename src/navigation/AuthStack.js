import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginForm from '../components/Auth/LoginForm';
import Register from '../components/Auth/Register';
import HomeAuth from '../components/Auth/HomeAuth';

export default function AuthStack() {
    const Stack = createNativeStackNavigator();
    
    return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='HomeAuth' component={HomeAuth} />
        <Stack.Screen name='Login' component={LoginForm} />
        <Stack.Screen name='Register' component={Register} />
    </Stack.Navigator>
  )
}