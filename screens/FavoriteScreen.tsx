import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import React from 'react';
import * as Icon from "react-native-feather";
import { themeColor } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';
import { favoriteAtom, userAtom } from '@/store';
import { API_URL } from '@env';
import axios from 'axios';

export default function FavoriteScreen() {
    const navigation = useNavigation<any>();
    const [favorites, setFavorites] = useAtom(favoriteAtom);
    const [user] = useAtom(userAtom);

    const removeFromFavorites = async (dishId: string) => {
        if (!user) {
            Alert.alert('Lỗi', 'Bạn cần đăng nhập để sử dụng tính năng này!');
            return;
        }

        const url = `${API_URL}/api/favorites/${user._id}/${dishId}`;

        try {
            const response = await axios.delete(url);
            if (response.status === 200) {
                setFavorites((prevFavorites) => prevFavorites.filter(favItem => favItem._id !== dishId));
                Alert.alert('Thành công', 'Đã xóa món ăn khỏi danh sách yêu thích!');
            } else {
                console.error('Lỗi khi xóa yêu thích:', response.data);
                Alert.alert('Lỗi', 'Đã xảy ra lỗi khi xóa yêu thích, vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Lỗi khi xóa yêu thích:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi xóa yêu thích, vui lòng thử lại!');
        }
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
                            <TouchableOpacity
                                onPress={() => removeFromFavorites(favoriteItem._id)}
                                className='p-1 ml-3 rounded-full'
                                style={{ backgroundColor: 'red' }}>
                                <Icon.X strokeWidth={2} height={20} width={20} stroke={'white'} />
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}