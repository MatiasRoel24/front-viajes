import React from 'react'
import Navigationtab from './Navigationtab';
import useAuth from '../hooks/useAuth';
import LoginForm from '../components/Auth/LoginForm';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';

export default function AuthNavigator() {
  const { userToken } = useAuth();

  return (
    <>
      {userToken == null ? <AuthStack/>  : <Navigationtab/>}
    </>
  )
}