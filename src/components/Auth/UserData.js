import { View, Text, Button } from 'react-native'
import React from 'react'
import useAuth from '../../hooks/useAuth';

export default function UserData() {

  const { userInfo, logOut } = useAuth();

  return (
    <View>
      <Text>BIENVENIDO, {userInfo.correo}</Text>
      <Button title="Salir" onPress={() => { logOut() }} />

    </View>
  )
}