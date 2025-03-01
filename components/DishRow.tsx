import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { themeColor } from '@/theme';
import * as Icon from "react-native-feather";
import { API_URL } from '@env';
import { useAtom } from 'jotai';
import { cartAtom, favoriteAtom, userAtom } from '@/store';
import axios from 'axios';

export default function DishRow({ item }: any) {
    const [cart, setCart] = useAtom(cartAtom);
    const [favorites, setFavorites] = useAtom(favoriteAtom);
    const [user] = useAtom(userAtom);

    const addToCart = () => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.dish._id === item._id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.dish._id === item._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { dish: item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = () => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.dish._id === item._id);
            if (existingItem && existingItem.quantity > 1) {
                return prevCart.map(cartItem =>
                    cartItem.dish._id === item._id
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                );
            } else {
                return prevCart.filter(cartItem => cartItem.dish._id !== item._id);
            }
        });
    };

    const toggleFavorite = async () => {
        if (!user) {
            Alert.alert('Lỗi', 'Bạn cần đăng nhập để sử dụng tính năng này!');
            return;
        }

        const isFavorite = favorites.some(favItem => favItem._id === item._id);
        const url = `${API_URL}/api/favorites/${user._id}/${item._id}`;

        try {
            if (isFavorite) {
                const response = await axios.delete(url);
                if (response.status === 200) {
                    setFavorites((prevFavorites) => prevFavorites.filter(favItem => favItem._id !== item._id));
                } else {
                    console.error('Lỗi khi xóa yêu thích:', response.data);
                    Alert.alert('Lỗi', 'Đã xảy ra lỗi khi xóa yêu thích, vui lòng thử lại!');
                }
            } else {
                const response = await axios.post(url);
                if (response.status === 200) {
                    setFavorites((prevFavorites) => [...prevFavorites, item]);
                } else {
                    console.error('Lỗi khi thêm yêu thích:', response.data);
                    Alert.alert('Lỗi', 'Đã xảy ra lỗi khi thêm yêu thích, vui lòng thử lại!');
                }
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật yêu thích:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật yêu thích, vui lòng thử lại!');
        }
    };

    const quantity = cart.find(cartItem => cartItem.dish._id === item._id)?.quantity || 0;
    const isFavorite = favorites.some(favItem => favItem._id === item._id);

    return (
        <View className='flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mx-2'
            style={{ borderColor: themeColor.bgColor(.2), borderWidth: 1, marginBottom: 5 }}>
            <Image source={{ uri: `${API_URL}${item.image}` }} className='rounded-3xl' style={{ height: 100, width: 100 }} />
            <View className='flex flex-1 space-y-3'>
                <View className='pl-3'>
                    <Text className='text-xl'>{item.name}</Text>
                    <Text className='text-gray-700'>{item.description}</Text>
                </View>

                <View className='flex-row justify-between pl-3 items-center mt-3'>
                    <Text className='text-gray-700 text-xl font-bold'>
                        $ {item.price}
                    </Text>
                    <View className='flex-row items-center'>
                        <TouchableOpacity
                            onPress={removeFromCart}
                            className='p-1 rounded-full'
                            style={{ backgroundColor: themeColor.bgColor(1) }}>
                            <Icon.Minus stroke={'white'} strokeWidth={2} height={20} width={20} />
                        </TouchableOpacity>
                        <Text className='px-2'>{quantity}</Text>
                        <TouchableOpacity
                            onPress={addToCart}
                            className='p-1 rounded-full'
                            style={{ backgroundColor: themeColor.bgColor(1) }}>
                            <Icon.Plus stroke={'white'} strokeWidth={2} height={20} width={20} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={toggleFavorite}
                            className='p-1 rounded-full ml-2'
                            style={{ backgroundColor: isFavorite ? 'red' : themeColor.bgColor(1) }}>
                            <Icon.Heart stroke={'white'} strokeWidth={2} height={20} width={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}