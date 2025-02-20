import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import * as Icon from "react-native-feather";
import { themeColor } from '@/theme';
import DishRow from '@/components/DishRow';

type Params = {
    name: string;
    stars: number;
    reviews: number;
    category: string;
    address: string;
    description: string;
    dishes: any;
    image: any;
};

type RouteParams = {
    params: Params;
};

export default function RestaurantScreen() {
    const route = useRoute<RouteProp<RouteParams, 'params'>>();
    const { params } = route;
    const navigation = useNavigation<any>();
    let item = params;

    return (
        <View className='bg-white h-screen'>
            <ScrollView>
                <View className='relative'>
                    {item && <Image source={{ uri: `http://10.106.21.180:8080${item.image}` }} className='w-full h-64' />}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className='absolute top-10 left-4 bg-gray-50 p-2 rounded-full shadow'>
                        <Icon.ArrowLeft strokeWidth={3} stroke={themeColor.bgColor(1)} />
                    </TouchableOpacity>
                </View>
                <View>
                    <View className='px-4 mt-4'>
                        <Text className='text-3xl font-bold' style={{ fontSize: 32 }}>{item.name}</Text>
                        <View className='flex-row space-x-2 my-1'>
                            <View className='flex-row items-center space-x-1'>
                                <Image source={require("../assets/images/startRating.png")} className='h-4 w-4' />
                                <Text className='text-xs'>
                                    <Text className='text-green-700'>{' '}{item.stars}</Text>
                                    <Text className='text-gray-700'> {' '}
                                        ({item.reviews} reviews) - <Text className='font-semibold'>{item.category}{' '}</Text>
                                    </Text>
                                </Text>
                            </View>
                            <View className='flex-row items-center space-x-1'>
                                <Icon.MapPin height='15' width='15' stroke='gray' />
                                <Text className='text-gray-700 text-xs'>{' '}Nearby {item.address}</Text>
                            </View>
                        </View>
                        <Text className='text-gray-500 mt-2'>{item.description}</Text>
                    </View>
                </View>
                <View className='pb-36 bg-white mt-5'>
                    <Text className='px-4 py-4 text-2xl font-bold'>Menu</Text>
                    {/* Dishes */}
                    {
                        item.dishes.map((dish: any, index: number) => <DishRow item={{ ...dish }} key={index} />)
                    }
                </View>
            </ScrollView >
        </View >
    )
}