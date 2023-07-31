import React, { useState, createContext, useEffect } from 'react'
import { createUser, loginApiSesion } from '../api/loginApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMexicanoToPeso, getProductsByEmail, createProduct, deleteProductApi } from '../api/productsAPI';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const { children } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [userToken, setUserToken] = useState(null);
    const [products, setProducts] = useState([]);
    const [totalesProducts, setTotalesProducts] = useState({});
    const [presupuesto, setPresupuesto] = useState('');
    const [valorMexicano, setValorMexicano] = useState('');


    const register = async (username, email, password) => {
        setIsLoading(true);
        const userData = await createUser(username, email, password);
        if (!userData.hasOwnProperty('msg')) {
            setIsLoading(false);
            setUserInfo(userData.usuario);
            setUserToken(userData.token);
            AsyncStorage.setItem('userToken', JSON.stringify(userData.token));
            AsyncStorage.setItem('userInfo', JSON.stringify(userData.usuario));
            setIsLoading(false);
        }
        setIsLoading(false);
        return userData.errors[0].msg;
    }

    const login = async (email, password) => {
        setIsLoading(true);
        const userInfo = await loginApiSesion(email, password);
        if (!userInfo.hasOwnProperty('msg')) {
            setUserInfo(userInfo.usuario);
            setUserToken(userInfo.token);
            AsyncStorage.setItem('userToken', JSON.stringify(userInfo.token));
            setIsLoading(false);
        }
        setIsLoading(false);
        return userInfo.msg;
    }

    const logOut = () => {
        setIsLoading(true);
        setUserToken(null);
        setPresupuesto(0);
        AsyncStorage.removeItem('userInfo')
        AsyncStorage.removeItem('mexicano')
        AsyncStorage.removeItem('userToken')
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserToken(userToken);
                setUserInfo(userInfo);
            }
            setIsLoading(false);
        } catch (error) {
            console.log("error en ISLOGGEDIN " + error)
        }

    }

    const getProducts = async () => {
        try {
            setIsLoading(true);
            const valorMexicano = await AsyncStorage.getItem('mexicano');
            const response = await getProductsByEmail(userInfo.correo);
            const productos = response;
            let totalDolares = 0;
            let totalMexicanos = 0;
            let totalPesos = 0;
            let totales;

            //Se agrega la convercion de monedas al objeto productos
            for (const producto of productos) {
                const precio = await getMexicanoToPeso(producto.precio, valorMexicano);
                producto["dolares"] = precio["cantida_dolares"];
                producto["pesos"] = precio["cantida_pesos"];
                producto["mexicanos"] = precio["cantida_mexicanos"];

                totalDolares += Number(precio["cantida_dolares"]);
                totalMexicanos += Number(precio["cantida_mexicanos"]);
                totalPesos += Number(precio["cantida_pesos"]);
            }
            totales = {
                "totalDolares": totalDolares.toFixed(3),
                "totalMexicanos": totalMexicanos.toFixed(3),
                "totalPesos": totalPesos.toFixed(3)
            }

            setValorMexicano(valorMexicano)
            setTotalesProducts(totales);
            setProducts(productos);
            setIsLoading(false);
        } catch (error) {
            console.log("error en GET-PRODUCTSBYEMAIL " + error)
        }

    }

    const deleteProduct = async (id) => {
        try {
            setIsLoading(true);
            const deleteProduct = await deleteProductApi(id);
            if(deleteProduct == undefined) getProducts();
            setIsLoading(false);
        } catch (error) {
            console.log("error en DELETE " + error)
        }

    }

    const getPresupuesto = async () => {
        let presupuestoStorage = await AsyncStorage.getItem('presupuesto');
        setPresupuesto(presupuestoStorage);
    }

    const getValorMexicano = async () => {
        let valorMexicano = await AsyncStorage.getItem('mexicano');
        setValorMexicano(valorMexicano);
    }

    const createNewProduct = async (titulo, descripcion, correo, precio) => {

        if (!titulo || !descripcion || !correo || !precio) throw new Error("Error campos de productos incompletos");
        const precioNumber = Number(precio);
        try {
            const producto = await createProduct(titulo, descripcion, correo, precioNumber);
            if (producto) {
                getProducts();
                return true;
            } else {
                throw new Error("Error al crear el producto");
            }

        } catch (error) {
            console.log("error en CREATEPODUCT " + error)
        }

    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    const valueContext = {
        register,
        isLoading,
        login,
        userToken,
        userInfo,
        logOut,
        products,
        totalesProducts,
        getProducts,
        createNewProduct,
        getPresupuesto,
        presupuesto,
        getValorMexicano,
        valorMexicano,
        deleteProduct
    };


    return (
        <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
    )
}

