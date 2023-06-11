import {Button, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../hooks/useAuth';
export default function Home() {
  const { logOut } = useAuth();
  return (
    <SafeAreaView>
      <Text>Estamos en home</Text>
      <Button title="Salir" onPress={() => {logOut()}} />
    </SafeAreaView>
  )
}