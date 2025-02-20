import { View, Text, Touchable, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { themeColor } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '@env';

interface RestaurantCardProps {
    item: any;
    index: number;
}

export default function RestaurantCard({ item, index }: RestaurantCardProps) {
    const navigation = useNavigation<any>();

    return (
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Restaurant', { ...item })}>
            <View
                style={{
                    shadowColor: themeColor.bgColor(.6),
                    shadowRadius: 7,
                }}
                className='mr-6 bg-white rounded-3xl shadow-lg' >
                <Image source={{ uri: `${API_URL}${item.image}` }} className='h-36 w-64 rounded-t-3xl' />
                <View className='px-3 pb-4 space-y-2'>
                    <Text className='text-lg font-bold pt-2'>{item.name}</Text>
                    <View className='flex-row items-center space-x-1'>
                        <Image source={require("../assets/images/startRating.png")} className='h-4 w-4' />
                        <Text className='text-xs'>
                            <Text className='text-green-700'>{' '}{item.stars}</Text>
                            <Text className='text-gray-700'> {' '}
                                ({item.reviews} reviews) - <Text className='font-semibold'>{item.category}</Text>
                            </Text>
                        </Text>
                    </View>
                    <View className='flex-row items-center space-x-1 mt-1'>
                        <Icon.MapPin height='15' width='15' stroke='gray' />
                        <Text className='text-gray-700 text-xs'>{' '}Nearby {item.address}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}