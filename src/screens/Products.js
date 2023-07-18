import React, { useEffect, useState } from 'react'
import { getMexicanoToPeso, getProductsByEmail } from '../api/productsAPI';
import ProductsList from '../components/Product/ProductsList';
import useAuth from '../hooks/useAuth';
import { View, Text } from 'react-native';



export default function Products() {
  const { getProducts, products ,totalesProducts } = useAuth();

  useEffect(() => {
    (async () => {
      await loadProducts();
    })()
  }, []);

  const loadProducts = async () => {
    try {
      await getProducts();
    } catch (error) {
      console.log(error);
    }
  }


  return (
      <ProductsList products={products} totales={totalesProducts}/>
  )
}

