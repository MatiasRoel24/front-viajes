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
        throw error;
    }
}

export async function getProduct(id){
    try {
        const url = `${API_HOST}/productos/${id}`;
        let product = await fetch(url)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('ERROR CONSULTA API-PRODUCTS', error)); 
        
        return product;
    } catch (error) {
        throw error;
    }
}