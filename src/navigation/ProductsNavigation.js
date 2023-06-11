import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Products from '../screens/Products';
import Product from '../screens/Product';


export default function ProductsNavigation() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "lightblue"
      }
    }
    }>
      <Stack.Screen name='Productos' component={Products} />
      <Stack.Screen name='Producto' component={Product} />
    </Stack.Navigator>
  )
}
