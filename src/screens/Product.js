import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import { getProduct } from '../api/productsAPI';
import Icon from 'react-native-vector-icons/FontAwesome5'


export default function Product(props) {
  const {navigation ,route : {params}} = props;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (() => {
      navigation.setOptions({
        headerRight: () => null,
        headerLeft: () => 
        <Icon name='arrow-left' 
              color='black' 
              size={25} 
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

  if(!product) return null;
  

  return (
    <View>
      <Text>ESTAMOS EN EL PRODUCTO</Text>
      <Text>Nombre: {product.titulo}</Text>
      <Text>Descricion: {product.descripcion}</Text>
      <Text>Precio: ${product.precio}</Text>
    </View>
  )
}