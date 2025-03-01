import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { hp, wp } from '@/helpers/common'
import { themeColor } from '@/theme'
import Button from '@/app/(auth)/components/Button'
import { router } from 'expo-router'

export default function welcome() {
    return (
        <ScreenWrapper bg={themeColor.bgColor(1)}>
            <StatusBar style='dark' />

            <View style={styles.container}>
                <View className='mt-24'>
                    <Image
                        style={[styles.welcomeImage, styles.outlineImage]}
                        resizeMode="contain"
                        source={require('../../assets/images/logo_moew_chef.png')}
                    />
                    <Image
                        style={styles.welcomeImage}
                        resizeMode="contain"
                        source={require('../../assets/images/logo_moew_chef.png')}
                    />
                </View>

                <View style={{ gap: 20 }}>
                    <Text style={styles.title}>Moew Food</Text>
                    <Text style={styles.punchline}>Welcome to moewFood, noi ban co the tim mon ban iu thich</Text>
                </View>

                <View style={styles.footer}>
                    <Button
                        title='Bắt đầu'
                        buttonStyle={{ marginHorizontal: wp(3) }}
                        onPress={() => router.push('/signup')} />
                    <View style={styles.bottomTextContainer}>
                        <Text>
                            Bạn đã có tài khoản?{' '}
                        </Text>
                        <Pressable onPress={() => router.push('/login')}>
                            <Text style={styles.loginText}>Đăng nhập</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: themeColor.bgColor(1),
        paddingHorizontal: wp(4),
        position: 'relative',
    },
    welcomeImage: {
        height: hp(30),
        width: wp(100),
        alignSelf: 'center',
    },
    outlineImage: {
        position: 'absolute',
        top: -25,
        height: hp(35),
        width: wp(100),
        tintColor: 'white', // Đổi màu viền thành trắng
    },
    title: {
        fontSize: hp(5),
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    punchline: {
        textAlign: 'center',
        paddingHorizontal: wp(10),
        fontSize: hp(1.7),
        color: 'white',
    },
    footer: {
        gap: 30,
        width: '100%',
        marginBottom: hp(8),
    },
    bottomTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    loginText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: hp(1.8),
    },
})