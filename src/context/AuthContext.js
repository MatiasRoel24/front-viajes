import React, { useState, createContext, useEffect } from 'react'
import { createUser, loginApiSesion } from '../api/loginApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const { children } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [userToken, setUserToken] = useState(null);

    const register = async (username,email,password) => {
        setIsLoading(true);
        const userData = await createUser(username, email, password); 
        setUserInfo(userData);
        AsyncStorage.setItem('userInfo', JSON.stringify(userData));
        setIsLoading(false);
    }

    const login = async (email,password) => {
        setIsLoading(true);
        const userInfo = await loginApiSesion(email,password);
        if( !userInfo.hasOwnProperty('msg')){
            setUserToken(userInfo.token)
            AsyncStorage.setItem('userToken', JSON.stringify(userInfo.token));
            setIsLoading(false);
        }
        setIsLoading(false);
        return userInfo.msg;
    }

    const logOut = () => {
        setIsLoading(true);
        setUserToken(null)
        AsyncStorage.removeItem('userToken')
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken);
            setIsLoading(false);
        } catch (error) {
            console.log("error en ISLOGGEDIN " + error)
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
    };


    return (
        <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
    )
}

