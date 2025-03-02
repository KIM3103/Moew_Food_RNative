import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import React, { useEffect } from 'react';
import * as Icon from "react-native-feather";
import { themeColor } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';
import { userAtom, invoicesAtom } from '@/store';
import { API_URL } from '@env';
import axios from 'axios';
import moment from 'moment';

export default function BillScreen() {
    const [user] = useAtom(userAtom);
    const [invoices, setInvoices] = useAtom(invoicesAtom);
    const navigation = useNavigation<any>();

    useEffect(() => {
        const fetchInvoices = async () => {
            if (!user) {
                Alert.alert('Lỗi', 'Bạn cần đăng nhập để sử dụng tính năng này!');
                return;
            }

            try {
                const response = await axios.get(`${API_URL}/api/invoices/${user._id}`);
                if (response.status === 200) {
                    setInvoices(response.data.invoices);
                } else {
                    console.error('Lỗi khi lấy danh sách hóa đơn:', response.data);
                    Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lấy danh sách hóa đơn, vui lòng thử lại!');
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách hóa đơn:', error);
                Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lấy danh sách hóa đơn, vui lòng thử lại!');
            }
        };

        fetchInvoices();
    }, [user]);

    const handleInvoicePress = (invoice) => {
        navigation.navigate('DetailBillScreen', { invoice });
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
                    <Text className='text-center font-bold text-xl'>Lịch sử hoá đơn</Text>
                </View>
            </View>

            {/* Invoices */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50, marginTop: 15 }}
                className='bg-white'>
                {invoices.map((invoice, index) => {
                    const dishNames = invoice.items.map(item => item.dish.name);
                    const displayedDishNames = dishNames.slice(0, 3).join(', ') + (dishNames.length > 3 ? '...' : '');

                    return (
                        <TouchableOpacity key={index} onPress={() => handleInvoicePress(invoice)}>
                            <View
                                className='flex-row items-center py-2 px-4 bg-white rounded-3xl mx-2 my-1 shadow-md'
                                style={{ borderColor: themeColor.bgColor(.2), borderWidth: 1 }}>
                                <View className='flex-1'>
                                    <Text className='font-bold text-gray-700'>{displayedDishNames}</Text>
                                    <Text className='text-gray-500'>Tổng tiền: {invoice.totalALL.toLocaleString()} VNĐ</Text>
                                    <Text className='text-gray-500'>Ngày đặt: {moment(invoice.createdAt).format('DD/MM/YYYY HH:mm:ss')}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}