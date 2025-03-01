import { themeColor } from '@/theme'; 
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useAtom } from 'jotai';
import { userAtom } from '@/store';
import axios from 'axios';
import InputForm from '@/app/(auth)/components/InputForm';
import { API_URL } from '@env';
import { hp, wp } from '@/helpers/common';

const ProfileDetail = () => {
    const router = useRouter();
    const [userInfo, setUserInfo] = useAtom(userAtom);
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(userInfo?.username || '');
    const [email, setEmail] = useState(userInfo?.email || '');
    const [location, setLocation] = useState(userInfo?.location || '');
    const [bio, setBio] = useState(userInfo?.bio || '');

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            Alert.alert('Đăng xuất thành công', 'Bạn đã đăng xuất thành công!', [
                {
                    text: 'OK',
                    onPress: () => router.replace('/login')
                }
            ]);
        } catch (error) {
            console.error('Lỗi đăng xuất:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi đăng xuất, vui lòng thử lại!');
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!userInfo) {
            Alert.alert('Lỗi', 'Thông tin người dùng không tồn tại!');
            return;
        }
        try {
            const response = await axios.put(`${API_URL}/api/users/${userInfo._id}`, {
                username,
                email,
                location,
                bio,
            });
            setUserInfo(response.data.user);
            Alert.alert('Cập nhật thành công', 'Thông tin của bạn đã được cập nhật!');
            setIsEditing(false);
        } catch (error) {
            console.error('Lỗi cập nhật:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật thông tin, vui lòng thử lại!');
        }
    };

    const handleCancel = () => {
        setUsername(userInfo?.username || '');
        setEmail(userInfo?.email || '');
        setLocation(userInfo?.location || '');
        setBio(userInfo?.bio || '');
        setIsEditing(false);
    };

    return (
        <View style={styles.container}>
            <View style={[styles.body, isEditing && { position: 'relative' }]}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={require('../../assets/images/cat_ava.jpg')}
                        style={{ width: 150, height: 150, borderRadius: 100, position: 'absolute' }} />
                </View>
                {!isEditing ? (
                    <View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>{userInfo?.username}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoLabel}>Email:</Text>
                            <Text style={styles.infoText}>{userInfo?.email}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoLabel}>Location:</Text>
                            <Text style={styles.infoText}>{userInfo?.location}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoLabel}>Bio:</Text>
                            <Text style={styles.infoText}>{userInfo?.bio}</Text>
                        </View>
                    </View>
                ) : (
                    <View style={styles.containerUpdate}>
                        {/* Form */}
                        <View style={styles.form}>
                            <Text style={{ fontSize: hp(1.5), color: themeColor.text }}>Vui lòng chỉnh sửa các thông tin{' '}
                                <Text className='font-bold text-red-500'>
                                    (email không thể chỉnh)
                                </Text>
                            </Text>
                            <InputForm
                                label="Username"
                                value={username}
                                onChangeText={setUsername}
                            />
                            <InputForm
                                label="Email"
                                value={email}
                                editable={false}
                            />
                            <InputForm
                                label="Location"
                                value={location}
                                onChangeText={setLocation} />
                            <InputForm
                                label="Bio"
                                value={bio}
                                onChangeText={setBio} />
                        </View>
                    </View>
                )}

                <View style={[styles.buttonContainer, isEditing && { position: 'absolute', bottom: 0, left: 30, right: 0 }]}>
                    <TouchableOpacity
                        style={[styles.editButton, isEditing && { backgroundColor: 'green' }]}
                        onPress={isEditing ? handleSave : handleEdit}
                    >
                        <Text style={styles.editButtonText}>{isEditing ? 'Lưu' : 'Chỉnh sửa'}</Text>
                    </TouchableOpacity>
                    {isEditing && (
                        <TouchableOpacity
                            style={[styles.cancelButton]}
                            onPress={handleCancel}
                        >
                            <Text style={styles.editButtonText}>Hủy</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity style={[styles.logoutButton, isEditing && { position: 'absolute', bottom: 0, right: 30 }]} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECF0F3',
        width: '100%',
        paddingHorizontal: 30
    },
    containerUpdate: {
        width: '100%',
        flex: 1,
        gap: 10,
        paddingHorizontal: wp(5),
    },
    body: {
        marginTop: 70,
        alignItems: 'center',
        justifyContent: 'center',
        height: '70%',
    },
    avatarContainer: {
        width: 160,
        height: 160,
        borderRadius: 100,
        backgroundColor: themeColor.bgColor(1),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 0.16,
    },
    avatar: {
        fontSize: 72,
        fontWeight: '700',
    },
    nameContainer: {
        marginTop: 24,
        alignItems: 'center',
    },
    name: {
        fontSize: 34,
        fontWeight: '700',
        color: themeColor.text
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: '700',
        marginRight: 8,
        color: themeColor.text
    },
    infoText: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 30,
    },
    editButton: {
        backgroundColor: themeColor.bgColor(1),
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
    },
    cancelButton: {
        backgroundColor: themeColor.bgColor(0.8),
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    editButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    logoutButton: {
        marginTop: 10,
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    form: {
        gap: 10,
    },
});

export default ProfileDetail;