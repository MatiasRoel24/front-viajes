import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'

import HomeNavigation from './HomeNavigation';
import ProductsNavigation from './ProductsNavigation';
import AccountNavigation from './AccountNavigation';
import { colors } from '../utils/constants';

export default function Navigationtab() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarInactiveBackgroundColor: colors.black, tabBarActiveBackgroundColor: colors.black}}>         
            <Tab.Screen 
                name="Home" 
                component={HomeNavigation} 
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({size}) => <Icon name='home' color={colors.white} size={size}/>
                        
                }}/>  
            <Tab.Screen name="Products" component={ProductsNavigation} options={{
                tabBarShowLabel: false,
                tabBarIcon: ({size}) => <Icon name='shopping-bag' color={colors.white} size={size}/>
            }}/>  
            <Tab.Screen name="Settings" component={AccountNavigation} options={{
                tabBarShowLabel: false,
                tabBarIcon: ({size}) => <Icon name='user-circle' color={colors.white} size={size}/>
            }}/>  

        </Tab.Navigator>        
    )
}