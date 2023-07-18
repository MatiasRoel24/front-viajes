import React from 'react'
import Navigationtab from './Navigationtab';
import useAuth from '../hooks/useAuth';
import AuthStack from './AuthStack';

export default function AuthNavigator() {
  const { userToken } = useAuth();

  return (
    <>
      {userToken == null ? <AuthStack /> : <Navigationtab />}
    </>
  )
}