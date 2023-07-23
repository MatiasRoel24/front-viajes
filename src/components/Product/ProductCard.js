import React from 'react'
import { capitalize } from 'lodash'
import { useNavigation } from "@react-navigation/native";
import { Button, Avatar, ListItem, HStack } from "@react-native-material/core";
import { currencyFormat } from "../../utils/numbers";



export default function ProductCard(props) {
    const { product } = props;
    const navigation = useNavigation();


    const goToProduct = () => {
        navigation.navigate('Producto - Detalle', { id: product._id })
    }

    return (
        <ListItem
            leadingMode="avatar"
            leading={
                <Avatar image={{ uri: "https://static.vecteezy.com/system/resources/previews/000/616/943/original/vector-shopping-bag-icon.jpg" }} />
            }
            title={capitalize(product.titulo)}
            secondaryText={`$${currencyFormat(product.precio)}`}
            trailing={<HStack ><Button color='black' compact variant="text" title="Ver mas" onPress={goToProduct} /></HStack>}
        />
    )
}
