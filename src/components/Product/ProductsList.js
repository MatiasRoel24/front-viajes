import { StyleSheet, FlatList, Platform, View } from 'react-native'
import React from 'react'
import ProductCard from './ProductCard';
import { Button } from "@react-native-material/core";
import { colors } from '../../utils/constants';

export default function ProductsList(props) {
    const { products } = props;

    return (
        <View style={styles.container}>
            
            <FlatList
                data={products}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <ProductCard product={item} />}
                contentscreentyle={styles.flatListContentContainer}
            />

        <Button title="+" style={styles.buttonAdd} color={colors.triadic} tintColor={colors.white}/>
        </View>

    );
}

const styles = StyleSheet.create({
    container: { 
        height: '100%',
    },
    flatListContentContainer: {
        paddingHorizontal: 5,
        marginTop: Platform.OS === "android" ? 20 : 0
    },
    buttonAdd:{
        position: 'absolute',
        bottom: 16,
        end: 16,
        width: 60,
        borderRadius: 90,
        fontSize: 70,
    }
})