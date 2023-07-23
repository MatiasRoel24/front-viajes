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

export async function getProductsByEmail(correo){
    try {
        let products = await fetch(`${API_HOST}/productos-correo/${correo}`)
        .then(response => response.json())
        .then(result => result )
        .catch(error => console.log('ERROR CONSULTA API-PRODUCTS: ', error)); 

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
        const valores = await getMexicanoToPeso(product.precio);
        product["dolares"] = valores["cantida_dolares"];
        product["pesos"] = valores["cantida_pesos"];
        return product;
    } catch (error) {
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
        console.log("CREATE PRODUCT API ", error)
        throw error;
    }
}

export async function getMexicanoToPeso(mexicanos){
    try {
        const url = `${API_HOST}/peso/${mexicanos}`;
        let prices = await fetch(url)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('ERROR CONSULTA API-PRODUCTS', error)); 

        return prices;
    } catch (error) {
        throw error;
    }
}