import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Products from '../screens/Products';
import Product from '../screens/Product';
import ProductAdd from '../components/Product/ProductAdd';
import { colors } from '../utils/constants';


export default function ProductsNavigation() {
  const Stack = createNativeStackNavigator();
  
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: colors.black,
      }
    }
    }>
      <Stack.Screen options={{headerTintColor: colors.white}} name='Lista productos' component={Products} />
      <Stack.Screen options={{headerTintColor: colors.white}} name='Producto - Detalle' component={Product} />
      <Stack.Screen options={{headerTintColor: colors.white}} name='Producto - Agregar' component={ProductAdd} />
    </Stack.Navigator>
  )
}
