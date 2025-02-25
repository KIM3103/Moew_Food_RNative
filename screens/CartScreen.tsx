import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { themeColor } from '@/theme'
import { useNavigation } from '@react-navigation/native'
import { useAtom } from 'jotai';
import { cartAtom } from '@/store';
import { API_URL } from '@env';

export default function CartScreen() {
    const [cart, setCart] = useAtom(cartAtom);
    const navigation = useNavigation<any>();
    const shippingFee = 50000;

    // Tính tổng giá của các món ăn trong giỏ hàng
    const totalPrice = cart.reduce((total, cartItem) => {
        return total + parseInt(cartItem.dish.price.replace(/[^0-9]/g, '')) * cartItem.quantity;
    }, 0);

    // Tính tổng tiền bao gồm phí giao hàng
    const totalAmount = totalPrice + shippingFee;

    const removeFromCart = (dishId: string) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map(cartItem =>
                cartItem.dish._id === dishId
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            ).filter(cartItem => cartItem.quantity > 0);

            if (updatedCart.length === 0) {
                navigation.goBack();
            }

            return updatedCart;
        });
    };

    const handleOrder = () => {
        // Xử lý logic đặt hàng
        navigation.navigate('PaymentSuccessOrder');
        // Làm trống giỏ hàng
        setCart([]);
    };

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
                    <Text className='text-center font-bold text-xl'>Your cart</Text>
                </View>
            </View>

            {/* Delivery time */}
            <View style={{ backgroundColor: themeColor.bgColor(0.2) }} className='flex-row px-4 items-center mt-3'>
                <Image source={require('../assets/images/shipper.png')} className='w-20 h-20 rounded-full' />
                <Text className='flex-1 pl-4 font-semibold'>Giao ngay trong vòng 20-30 phút</Text>
                <TouchableOpacity>
                    <Text className='font-bold' style={{color: themeColor.text}}>
                        Thay đổi
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Dishes */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50, marginTop: 15 }}
                className='bg-white'>
                {cart.map((cartItem, index) => {
                    return (
                        <View key={index}
                            className='flex-row items-center py-2 px-4 bg-white rounded-3xl mx-2 my-1 shadow-md'
                            style={{ borderColor: themeColor.bgColor(.2), borderWidth: 1 }}>
                            <Text className='font-bold' style={{ color: themeColor.text, shadowColor: themeColor.bgColor(1) }}>
                                {cartItem.quantity} x {' '}
                            </Text>
                            <Image source={{ uri: `${API_URL}${cartItem.dish.image}` }} className='rounded-full' style={{ height: 70, width: 70 }} />
                            <Text className='flex-1 font-bold text-gray-700 ml-5'>{cartItem.dish.name}</Text>
                            <Text className='font-semibold text-base'>{cartItem.dish.price}</Text>
                            <TouchableOpacity
                                onPress={() => removeFromCart(cartItem.dish._id)}
                                className='p-1 ml-3 rounded-full'
                                style={{ backgroundColor: themeColor.bgColor(1) }}>
                                <Icon.Minus strokeWidth={2} height={20} width={20} stroke={'white'} />
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView>

            {/* Total */}
            <View
                style={{ backgroundColor: themeColor.bgColor(0.2) }}
                className='p-6 px-8 rounded-t-3xl space-y-4'>
                <View className='flex-row justify-between'>
                    <Text className='text-gray-700'>Thành tiền</Text>
                    <Text className='text-gray-700'>{totalPrice.toLocaleString()} VNĐ</Text>
                </View>
                <View className='flex-row justify-between my-2'>
                    <Text className='text-gray-700'>Phí giao hàng</Text>
                    <Text className='text-gray-700'>{shippingFee.toLocaleString()} VNĐ</Text>
                </View>
                <View className='flex-row justify-between'>
                    <Text className='text-gray-700 font-extrabold'>Tổng đơn hàng</Text>
                    <Text className='text-gray-700 font-extrabold'>{totalAmount.toLocaleString()} VNĐ</Text>
                </View>
                <View className='mt-6'>
                    <TouchableOpacity
                        onPress={handleOrder}
                        style={{ backgroundColor: themeColor.bgColor(1) }}
                        className='p-3 rounded-full'>
                        <Text className='text-white text-center font-bold text-lg'>Đặt hàng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}