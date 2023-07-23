import React, { useEffect } from 'react'
import ProductsList from '../components/Product/ProductsList';
import useAuth from '../hooks/useAuth';



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

