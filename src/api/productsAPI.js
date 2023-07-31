import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_HOST } from "../utils/constants";

export async function getProductsApi(){
    try {
        const url = `${API_HOST}/productos`;
        let products = await fetch(url)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('ERROR CONSULTA API-PRODUCTS', error)); 

        const productos = products.map(product => product)
        return productos;
    } catch (error) {
        console.log("getProductsApi() ", error)
        throw error;
    }
}

export async function getProductsByEmail(correo){
    try {
        let products = await fetch(`${API_HOST}/productos-correo/${correo}`)
        .then(response => response.json())
        .then(result => result )
        .catch(error => console.log('ERROR CONSULTA API-PRODUCTS: ', error)); 

        const productos = products.map(product => product)
        return productos;
    } catch (error) {
        console.log("getProductsByEmail() ", error)
        throw error;
    }
}

export async function getProduct(id){
    try {
        const valorMexicano = await AsyncStorage.getItem('mexicano');
        const url = `${API_HOST}/productos/${id}`;
        let product = await fetch(url)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('ERROR CONSULTA API-PRODUCTS', error)); 
        const valores = await getMexicanoToPeso(product.precio, valorMexicano);
        product["dolares"] = valores["cantida_dolares"];
        product["pesos"] = valores["cantida_pesos"];

        return product;
    } catch (error) {
        console.log("getProduct(id) ", error)
        throw error;
    }
}

export async function createProduct(titulo, descripcion, correo, precio){
    try {

        const raw = JSON.stringify({
            "titulo": titulo,
            "descripcion": descripcion,
            "correo": correo,
            "precio": Number(precio)
          });
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: raw,
            redirect: 'follow'
          };

        const url = `${API_HOST}/productos`;
        let producto = await fetch(url,requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('ERROR CONSULTA CREATE-PROIDUCT', error)); 

        if(!producto) throw new Error("Error al crear el producto");

        return true;
    } catch (error) {
        console.log("createProduct() ", error)
        throw error;
    }
}


export async function deleteProductApi(id){
    try {

        let raw = "";

        let requestOptions = {
          method: 'DELETE',
          body: raw,
          redirect: 'follow'
        };

        const url = `${API_HOST}/productos/${id}`;
        
        fetch(url, requestOptions)
          .then(response => response.status == 204 ? true : false)
          .catch(error => console.log('error', error));

    } catch (error) {
        console.log("deleteProduct() ", error)
        throw error;
    }
}



export async function getMexicanoToPeso(mexicanos, valorMexicanos){
    try {
        const url = `${API_HOST}/peso/${mexicanos}/${valorMexicanos}`;
        let prices = await fetch(url)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('ERROR CONSULTA API-PRODUCTS', error)); 
        return prices;
    } catch (error) {
        console.log("getMexicanoToPeso() ", error);
        throw error;
    }
}