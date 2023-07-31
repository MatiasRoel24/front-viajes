import { View } from 'react-native'
import React from 'react'
import { Text, Button, Avatar } from "@react-native-material/core";
import useAuth from '../../hooks/useAuth';

export default function UserData() {

  const { userInfo, logOut } = useAuth();

  return (
    <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 10}}>
      <Text variant="h3">Mi perfil</Text>
      <Avatar image={{ uri: "https://img.freepik.com/fotos-premium/perro-chihuahua-sombrero-mexicano-moda-cinco-mayo_778980-1162.jpg?w=2000" }} size={250}/>
      <Text variant="h4">Nombre: </Text>
      <Text variant="h6">{userInfo.nombre}</Text>
      <Text variant="h4">Correo: </Text>
      <Text variant="h6">{userInfo.correo}</Text>
      <Button style={{marginTop: 20}} title="Cerrar sesion" onPress={() => { logOut() }} />

    </View>
  )
}