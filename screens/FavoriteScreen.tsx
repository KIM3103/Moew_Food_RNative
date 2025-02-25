import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { themeColor } from '@/theme'
import { useNavigation } from '@react-navigation/native'
import { useAtom } from 'jotai';
import { favoriteAtom } from '@/store';
import { API_URL } from '@env';

export default function FavoriteScreen() {
    const navigation = useNavigation<any>();
    const [favorites] = useAtom(favoriteAtom);

    return (
        <View className='bg-white flex-1'>
            {/* back button */}
            <View className='relative py-4 shadow-sm'>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ backgroundColor: themeColor.bgColor(1) }}
                    className='absolute left-4 p-1 rounded-full shadow z-20 mt-5'>
                    <Icon.ArrowLeft strokeWidth={3} stroke={'white'} />
                </TouchableOpacity>
                <View>
                    <Text className='text-center font-bold text-xl'>Favorite</Text>
                </View>
            </View>

            {/* Dishes */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50, marginTop: 15 }}
                className='bg-white'>
                {favorites.map((favoriteItem, index) => {
                    return (
                        <View key={index}
                            className='flex-row items-center py-2 px-4 bg-white rounded-3xl mx-2 my-1 shadow-md'
                            style={{ borderColor: themeColor.bgColor(.2), borderWidth: 1 }}>
                            <Image source={{ uri: `${API_URL}${favoriteItem.image}` }} className='rounded-full' style={{ height: 70, width: 70 }} />
                            <Text className='flex-1 font-bold text-gray-700 ml-5'>{favoriteItem.name}</Text>
                            <Text className='font-semibold text-base'>{favoriteItem.price}</Text>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}