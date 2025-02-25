import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { themeColor } from '@/theme'
import { useNavigation } from '@react-navigation/native'
import { useAtom } from 'jotai';
import { cartAtom } from '@/store';

export default function CartIcon() {
    const navigation = useNavigation<any>();
    const [cart] = useAtom(cartAtom);

    const totalQuantity = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
    const totalPrice = cart.reduce((total, cartItem) => {
        return total + parseInt(cartItem.dish.price.replace(/[^0-9]/g, '')) * cartItem.quantity;
    }, 0);

    if (totalQuantity === 0) {
        return null;
    }

    return (
        <View className='absolute bottom-12 w-full z-50'>
            <TouchableOpacity
                onPress={() => navigation.navigate('Cart')}
                style={{ backgroundColor: themeColor.bgColor(1) }}
                className='flex-row justify-between items-center mx-5 rounded-full p-4 py-3 shadow-lg'>
                <View className='p-2 px-4 rounded-full' style={{ backgroundColor: 'rgba(255,255, 255, 0.3)' }}>
                    <Text className='font-extrabold text-white text-lg'>
                        {totalQuantity}
                    </Text>
                </View>
                <Text className='flex-1 text-center font-extrabold text-white text-lg'>
                    Xem giỏ hàng
                </Text>
                <Text className='font-extrabold text-white text-lg'>
                    {totalPrice.toLocaleString()} VNĐ
                </Text>
            </TouchableOpacity>
        </View>
    )
}