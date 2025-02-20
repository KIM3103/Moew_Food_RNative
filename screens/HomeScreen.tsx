import { View, Text, TextInput, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as Icon from "react-native-feather";
import { themeColor } from '@/theme';
import Categories from '@/components/Categories';
import FeaturedRow from '@/components/FeaturedRow';
// import { featured } from '@/constants';
import { useAtom } from 'jotai';
import { productsAtom } from '@/store';

export default function HomeScreen() {
    const [products, setProducts] = useAtom(productsAtom);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${process.env.URL_API}/api/products`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Lỗi khi lấy products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <SafeAreaView className='bg-white flex-1'>
            <StatusBar style="dark" />
            {/* Search bar */}
            <View className='flex-row items-center space-x-2 px-4 pb-2 gap-2'>
                <View className='flex-row items-center p-2 rounded-full border border-gray-300 flex-1'>
                    <Icon.Search height='25' width='25' stroke='gray' />
                    <TextInput placeholder='Restaurants' className='ml-2 flex-1' />
                    <View className='flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300'>
                        <Icon.MapPin height='20' width='20' stroke='gray' />
                        <Text className='text-gray-600 text-sm'>VietNam, HCM</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: themeColor.bgColor(1) }} className='p-3 rounded-full'>
                    <Icon.Sliders height="20" width='20' strokeWidth={2.5} stroke="white" />
                </View>
            </View>

            {/* main */}
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 20
                }}>
                {/* Categories  */}
                <Categories />

                {/* Featured */}
                <View className='mt-5'>
                    {
                        products.map((item, index) => {
                            return (
                                <FeaturedRow
                                    key={index}
                                    title={item.title}
                                    restaurants={item.restaurants}
                                    description={item.description}>
                                </FeaturedRow>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}