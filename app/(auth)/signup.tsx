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

export default function signup() {
    const router = useRouter()
    const [username, setUsername] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    const onSubmit = async () => {
        if (!username || !email || !password) {
            alert('Vui lòng nhập đầy đủ thông tin')
            return
        }
        console.log('>>> Check data submit: ', { username, email, password })
        setLoading(true)
        setError(null)
        try {
            const response = await axios.post(`${API_URL}/api/auth/register`, {
                username,
                email,
                password,
            })
            setLoading(false)
            Alert.alert('Đăng ký thành công', 'Bạn đã đăng ký thành công!', [
                {
                    text: 'OK',
                    onPress: () => router.push('/login')
                }
            ])
        } catch (error: any) {
            setLoading(false)
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
                    <Text style={styles.title}>Hey,</Text>
                    <Text style={styles.title}>Cùng bắt đầu nào</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <Text style={{ fontSize: hp(1.5), color: themeColor.text }}>Vui lòng điền đầy đủ thông tin tạo tài khoản</Text>

                    {/* Input Username */}
                    <InputForm
                        icon={<Icon.User color={themeColor.text} />}
                        placeholder='Enter username'
                        autoCapitalize='none'
                        value={username}
                        onChangeText={setUsername}
                        returnKeyType='next'
                    />
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

                    <View className='mt-10'>
                        <Button title='Đăng ký' loading={loading} onPress={onSubmit} buttonStyle={{ backgroundColor: themeColor.bgColor(1) }} textStyle={{ color: 'white' }} />
                    </View>

                    <View style={styles.footer}>
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
        gap: 20,
    },
    footer: {
        gap: 30,
        width: '100%',
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