import { View, Text, StatusBar, StyleSheet, Pressable, Alert } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import BackButton from '@/app/(auth)/components/BackButton'
import { themeColor } from '@/theme'
import { hp, wp } from '@/helpers/common'
import { useRouter } from 'expo-router'
import InputForm from '@/app/(auth)/components/InputForm'
import * as Icon from "react-native-feather";
import Button from '@/app/(auth)/components/Button'
import { API_URL } from '@env';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAtom } from 'jotai';
import { userAtom } from '@/store';


export default function login() {
    const router = useRouter()
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const [userInfo, setUserInfo] = useAtom(userAtom)

    const onSubmit = async () => {
        if (!email || !password) {
            alert('Vui lòng nhập đầy đủ thông tin')
            return
        }
        console.log('>>> Check data submit: ', { email, password })
        setLoading(true)
        setError(null)
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, {
                email,
                password,
            })
            const user = response.data.user;
            if (!user) {
                throw new Error('Thông tin người dùng không tồn tại trong phản hồi');
            }
            await AsyncStorage.setItem('userToken', user._id); // Lưu trữ ID người dùng hoặc thông tin cần thiết
            setLoading(false)
            setUserInfo(user)

            Alert.alert('Đăng nhập thành công', 'Bạn đã đăng nhập thành công!', [
                {
                    text: 'OK',
                    onPress: () => router.replace('/')  
                }
            ])
        } catch (error: any) {
            setLoading(false)
            console.error('Lỗi đăng nhập:', error); // Log chi tiết lỗi
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            } else {
                setError('Đã xảy ra lỗi, vui lòng thử lại!')
            }
        }
    }

    return (
        <ScreenWrapper bg='white'>
            <StatusBar barStyle='dark-content' />
            <View style={styles.container}>
                <BackButton />

                <View>
                    <Text style={styles.title}>Xin Chào,</Text>
                    <Text style={styles.title}>Chào mừng quay trở lại</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <Text style={{ fontSize: hp(1.5), color: themeColor.text }}>Vui lòng đăng nhập để tiếp tục</Text>

                    <InputForm
                        icon={<Icon.Mail color={themeColor.text} />}
                        placeholder='Eg: example@gmail.com'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        value={email}
                        onChangeText={setEmail}
                        returnKeyType='next'
                    />
                    <InputForm
                        icon={<Icon.Lock color={themeColor.text} />}
                        placeholder='Enter password'
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        returnKeyType='done'
                    />
                    {error && <Text style={styles.errorText}>{error}</Text>}
                    <Text style={{ color: themeColor.text, textAlign: 'right' }}>Quên mật khẩu?</Text>

                    <Button title='Đăng nhập' loading={loading} onPress={onSubmit} buttonStyle={{ backgroundColor: themeColor.bgColor(1) }} textStyle={{ color: 'white' }} />

                    <View style={styles.footer}>
                        <View style={styles.bottomTextContainer}>
                            <Text>
                                Bạn chưa có tài khoản?{' '}
                            </Text>
                            <Pressable onPress={() => router.push('/signup')}>
                                <Text style={styles.loginText}>Đăng ký</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 45,
        paddingHorizontal: wp(5),
    },
    title: {
        fontSize: hp(5),
        alignItems: 'flex-start',
        fontWeight: 'bold',
        color: themeColor.text,
    },
    form: {
        gap: 25,
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
        color: themeColor.text,
        fontWeight: 'bold',
        fontSize: hp(1.8),
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
})