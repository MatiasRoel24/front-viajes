import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import {capitalize} from 'lodash'
import { useNavigation } from "@react-navigation/native";

export default function ProductCard(props) {
    const { product } = props;
    const navigation = useNavigation();


    const goToProduct = () => {
        navigation.navigate('Producto', {id: product._id})
    }
    return (
        <TouchableWithoutFeedback onPress={goToProduct}>
            <View style={styles.card}>
                <Text style={styles.title}>{capitalize(product.titulo)}</Text>
                <Text style={styles.title}>{capitalize(product.descripcion)}</Text>
                <Text style={styles.title}>Mexicanos: ${product.precio}</Text>
                <Text style={styles.title}>Dolares: ${product.dolares}</Text>
                <Text style={styles.title}>Pesos: ${product.pesos}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    card:{
        backgroundColor:"black",
        height:250,
        marginTop:8,
        marginBottom:2,
        alignItems:"center",
        justifyContent:"center"
    },
    title:{
        color:"white",
        textAlign:"center"
    }
})