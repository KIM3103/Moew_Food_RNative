import { useEffect, useState } from 'react'
import { Tabs, useRouter } from 'expo-router'
import TabBar from '@/components/TabBar'
import AsyncStorage from '@react-native-async-storage/async-storage';

const _layout = () => {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = await AsyncStorage.getItem('userToken');
            setIsLoggedIn(!!token);
        };

        checkLoginStatus();
    }, []);

    useEffect(() => {
        if (isLoggedIn === null) return;

        const timeout = setTimeout(() => {
            if (isLoggedIn) {
                router.replace("/");
            } else {
                router.replace("/welcome");
            }
        }, 0); // Đợi 1 tick để RootLayout mount hoàn chỉnh

        return () => clearTimeout(timeout); // Dọn dẹp timeout khi component unmount
    }, [isLoggedIn]);

    return (
        <Tabs
            tabBar={props => <TabBar {...props} />}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name='cart'
                options={{
                    title: 'Cart',
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name='favorite'
                options={{
                    title: 'Favorite',
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name='bill'
                options={{
                    title: 'Bill',
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    headerShown: false,
                }}
            />
        </Tabs>
    )
}

export default _layout