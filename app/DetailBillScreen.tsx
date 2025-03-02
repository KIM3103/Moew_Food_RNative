import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import React from 'react';
import * as Icon from "react-native-feather";
import { themeColor } from '@/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import { API_URL } from '@env';

export default function DetailBillScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const { invoice } = route.params;

    if (!invoice || !invoice.items) {
        return (
            <View className='bg-white flex-1 justify-center items-center'>
                <Text className='text-gray-500'>Không có dữ liệu hóa đơn</Text>
            </View>
        );
    }

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
                    <Text className='text-center font-bold text-xl'>Chi tiết hoá đơn</Text>
                </View>
            </View>

            {/* Invoice Details */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50, marginTop: 15 }}
                className='bg-white'>
                {invoice.items.map((item, itemIndex) => (
                        <View key={itemIndex}
                        className='flex-row items-center py-2 px-4 bg-white rounded-3xl mx-2 my-1 shadow-md'
                        style={{ borderColor: themeColor.bgColor(.2), borderWidth: 1 }}>
                        <Image source={{ uri: `${API_URL}${item.dish.image}` }} className='rounded-full' style={{ height: 70, width: 70, marginRight: 10 }} />
                        <View>
                            <Text className='font-bold text-gray-700'>{item.dish.name}</Text>
                            <Text className='text-gray-500'>Số lượng: {item.quantity}</Text>
                            <Text className='text-gray-500'>Giá: {item.price.toLocaleString()} VNĐ</Text>
                        </View>
                    </View>
                ))}
                <View
                style={{ backgroundColor: themeColor.bgColor(0.2) }}
                className='p-6 px-8 space-y-4 mt-3'>
                <View className='flex-row justify-between'>
                    <Text className='text-gray-700'>Thành tiền</Text>
                    <Text className='text-gray-700'>{invoice.totalPrice.toLocaleString()} VNĐ</Text>
                </View>
                <View className='flex-row justify-between my-2'>
                    <Text className='text-gray-700'>Phí giao hàng</Text>
                    <Text className='text-gray-700'>{invoice.deliveryFee.toLocaleString()} VNĐ</Text>
                </View>
                <View className='flex-row justify-between mb-2'>
                    <Text className='text-gray-700'>Ngày đặt:</Text>
                    <Text className='text-gray-700'>{moment(invoice.createdAt).format('DD/MM/YYYY HH:mm:ss')}</Text>
                </View>
                <View className='flex-row justify-between'>
                    <Text className='text-gray-700 font-extrabold'>Tổng đơn hàng</Text>
                    <Text className='text-gray-700 font-extrabold'>{invoice.totalALL.toLocaleString()} VNĐ</Text>
                </View>
            </View>
            </ScrollView>
        </View>
    )
}