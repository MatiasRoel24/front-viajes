import React, { useEffect, useState } from 'react'
import { getProductsApi } from '../api/productsAPI';
import ProductsList from '../components/Product/ProductsList';



export default function Products() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    (async ()=>{
      await loadProducts();
    })()
  }, []);

  const loadProducts = async() => {
    try {
      const response = await getProductsApi();
      const productos = response;
      setProducts(productos)
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    //<SafeAreaView style={styles.screen}>
      <ProductsList products={products}/>      
    //</SafeAreaView>
  )
}

/* const styles = StyleSheet.create({
  screen:{
    flex:1,
    backgroundColor:"red",
  }
})
 */
