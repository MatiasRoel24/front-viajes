import { StyleSheet, View } from 'react-native'
import { Text } from "@react-native-material/core";
import React, { useState, useEffect } from 'react'
import { getProduct } from '../api/productsAPI';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../utils/constants';
import { currencyFormat } from '../utils/numbers';


export default function Product(props) {
  const { navigation, route: { params } } = props;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (() => {
      navigation.setOptions({
        headerRight: () => null,
        headerLeft: () =>
          <Icon name='arrow-left'
            color={colors.white}
            size={17}
            style={{ marginRight: 10 }}
            onPress={navigation.goBack}
          />
      })
    })()
  }, [product, params])

  useEffect(() => {
    (async () => {
      try {
        const response = await getProduct(params.id);
        setProduct(response);
      } catch (error) {
        navigation.goBack()
      }
    })()
  }, [params])



  if (!product) return null;

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text variant="h5">Producto seleccionado:</Text>
        <Text variant="h4">{product.titulo}</Text>
      </View>
      <View style={styles.containerInfo}>
        <Text variant="h5">Categoria del producto:</Text>
        <Text variant="h4">{product.descripcion}</Text>
      </View>
      <View style={styles.containerInfo}>
        <Text variant="h5">Precio en mexicanos:</Text>
        <Text variant="h4">${currencyFormat(product.precio)}</Text>
      </View>

      <View style={styles.containerInfo}>
        <Text variant="h5">Precio en dolares:</Text>
        <Text variant="h4">${currencyFormat(product.dolares)}</Text>
      </View>

      <View style={styles.containerInfo}>
        <Text variant="h5">Precio en pesos:</Text>
        <Text variant="h4">${currencyFormat(product.pesos)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexdirection: 'column',
    gap: 10,
    backgroundColor: colors.white
  },
  containerInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
})