import {Button, Text,View } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth';
export default function Home() {
  const { logOut } = useAuth();
  return (
    <View>
      <Text>Estamos en home</Text>
      <Button title="Salir" onPress={() => {logOut()}} />
    </View>
  )
}