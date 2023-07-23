import { Text, View } from 'react-native'
import { Button } from "@react-native-material/core";
import React from 'react'
import useAuth from '../hooks/useAuth';

export default function Home() {
  const { logOut } = useAuth();
  return (
    <View>
      <Text>Estamos en home</Text>
      <Button title="Salir" onPress={() => { logOut() }} />
    </View>
  )
}