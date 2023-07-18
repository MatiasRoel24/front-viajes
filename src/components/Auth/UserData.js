import { View, Text } from 'react-native'
import React from 'react'
import useAuth from '../../hooks/useAuth';

export default function UserData() {

  const { userInfo } = useAuth();

  return (
    <View>
      <Text>BIENVENIDO, {userInfo.correo}</Text>
    </View>
  )
}