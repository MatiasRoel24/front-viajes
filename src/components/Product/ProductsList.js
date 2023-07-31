import { StyleSheet, FlatList, Platform, View } from 'react-native'
import React from 'react'
import ProductCard from './ProductCard';
import { Button } from "@react-native-material/core";
import { colors } from '../../utils/constants';
import { useNavigation } from '@react-navigation/core';
import Spinner from "react-native-loading-spinner-overlay";
import useAuth from '../../hooks/useAuth';


export default function ProductsList(props) {
    const { products } = props;
    const { isLoading } = useAuth();
    const navigation = useNavigation();

    const goToAddProduct = () => {
        navigation.navigate('Producto - Agregar')
    }

    return (
        <View style={styles.container}>
            <Spinner visible={isLoading} />
            <FlatList
                data={products}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <ProductCard product={item} />}
                contentscreentyle={styles.flatListContentContainer}
            />

        <Button title="+" style={styles.buttonAdd} tintColor={colors.white} onPress={goToAddProduct}/>
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