import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { themeColor } from '@/theme'
import { useNavigation } from '@react-navigation/native'

export default function CartIcon() {
    const navigation = useNavigation<any>();

    return (
        <View className='absolute bottom-12 w-full z-50'>
            <TouchableOpacity
                onPress={() => navigation.navigate('Cart')}
                style={{ backgroundColor: themeColor.bgColor(1) }}
                className='flex-row justify-between items-center mx-5 rounded-full p-4 py-3 shadow-lg'>
                <View className='p-2 px-4 rounded-full' style={{ backgroundColor: 'rgba(255,255, 255, 0.3)' }}>
                    <Text className='font-extrabold text-white text-lg'>
                        3
                    </Text>
                </View>
                <Text className='flex-1 text-center font-extrabold text-white text-lg'>
                    Xem giỏ hàng
                </Text>
                <Text className='font-extrabold text-white text-lg'>
                    750,000 VNĐ
                </Text>
            </TouchableOpacity>
        </View>
    )
}