import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import RestaurantScreen from './screens/RestaurantScreen';
import HomeScreen from './screens/HomeScreen';
import FavoriteScreen from '@/screens/FavoriteScreen';
import PaymentSuccessOrderScreen from '@/screens/PaymentSuccessOrderScreen';
import BillScreen from './screens/BillScreen';
import DetailBillScreen from './app/DetailBillScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />
            <Stack.Screen name="Favorite" component={FavoriteScreen} />
            <Stack.Screen name="PaymentSuccessOrder" component={PaymentSuccessOrderScreen} />
            <Stack.Screen name="BillScreen" component={BillScreen} />
            <Stack.Screen name="DetailBillScreen" component={DetailBillScreen} />
        </Stack.Navigator>
    )
}