import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { themeColor } from '@/theme'
import ConfettiCannon from 'react-native-confetti-cannon'
import { useRouter } from 'expo-router';

export default function PaymentSuccessOrder() {
    const [showConfetti, setShowConfetti] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 3000); // 5 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <View className='flex-1 items-center justify-center max-w-md mx-auto'>
            {showConfetti && <ConfettiCannon count={200} origin={{x: -10, y: 0}} />}
            <Text className='font-extrabold text-3xl mb-5' style={{ color: '#02B874' }}>Thanh toán thành công</Text>
            <Image source={require('../assets/images/success_icon.png')} className='w-28 h-28 rounded-full' />
            <Text className='text-center mt-10 font-light text-lg'>
                Đơn hàng của quý khách đã thanh toán thành công{"\n"}
                Chúng tôi sẽ liên hệ quý khách để xác nhận đơn hàng.
            </Text>
            <View className='mt-16'>
                <TouchableOpacity
                    onPress={() => router.replace('/') }
                    style={{ backgroundColor: themeColor.bgColor(1) }}
                    className='p-3 rounded-md w-72'>
                    <Text className='text-white text-center font-bold text-lg'>Về trang chủ</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}