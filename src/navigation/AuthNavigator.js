import React from 'react'
import Navigationtab from './Navigationtab';
import useAuth from '../hooks/useAuth';
import LoginForm from '../components/Auth/LoginForm';

export default function AuthNavigator() {

  const { userToken } = useAuth();

  return (
    <>
      {userToken == null ? <LoginForm /> : <Navigationtab/>}
    </>
  )
}