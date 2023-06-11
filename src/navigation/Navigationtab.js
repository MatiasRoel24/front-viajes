import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'

import HomeNavigation from './HomeNavigation';
import ProductsNavigation from './ProductsNavigation';
import AccountNavigation from './AccountNavigation';

export default function Navigationtab() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>         
            <Tab.Screen 
                name="Home" 
                component={HomeNavigation} 
                options={{
                    tabBarLabel:'Inicio',
                    tabBarIcon: ({color,size}) => <Icon name='home' color={color} size={size}/>
                        
                }}/>  
            <Tab.Screen name="Products" component={ProductsNavigation} options={{
                tabBarLabel:'Productos',
                tabBarIcon: ({color,size}) => <Icon name='shopping-bag' color={color} size={size}/>
            }}/>  
            <Tab.Screen name="Settings" component={AccountNavigation} options={{
                tabBarLabel:'Mi perfil',
                tabBarIcon: ({color,size}) => <Icon name='user-circle' color={color} size={size}/>
            }}/>  

        </Tab.Navigator>        
    )
}