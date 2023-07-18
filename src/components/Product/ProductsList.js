import { StyleSheet, FlatList, Platform } from 'react-native'
import React from 'react'
import ProductCard from './ProductCard';

export default function ProductsList(props) {
    const { products, totales } = props;
    
    return (
    <FlatList
        data={ products }
        numColumns={1}
        showsVerticalScrollIndicator={false}
        keyExtractor={ (item) => item._id}
        renderItem={({item}) => <ProductCard product={item}/> }
        contentscreentyle={styles.flatListContentContainer}
    />
  
  );
}

const styles = StyleSheet.create({
    flatListContentContainer:{
        paddingHorizontal: 5,
        marginTop: Platform.OS === "android" ? 20 : 0
    }
})