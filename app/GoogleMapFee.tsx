import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import haversine from 'haversine';
import { useAtom } from 'jotai';
import { travelDistanceAtom } from '../store';
import { themeColor } from '@/theme';
import * as Icon from "react-native-feather";
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

export default function GoogleMapFee() {
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [, setTravelDistance] = useAtom(travelDistanceAtom);
    const navigation = useNavigation<any>();
    const router = useRouter();

    const handleMapPress = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        if (!origin) {
            setOrigin({ latitude, longitude });
        } else if (!destination) {
            setDestination({ latitude, longitude });
        }
    };

    const clearOrigin = () => {
        setOrigin(null);
    };

    const clearDestination = () => {
        setDestination(null);
    };

    const calculateDistance = () => {
        if (origin && destination) {
            return haversine(origin, destination, { unit: 'meter' }).toFixed(2);
        }
        return 0;
    };

    const handleConfirm = () => {
        const distance = calculateDistance();
        const duration = (distance / 1000) * 2; // 2 minutes per km
        setTravelDistance({ distance, duration });
        router.push('/cart');
    };

    return (
        <View style={{ flex: 1 }}>
            <View className='relative py-4 shadow-sm'>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ backgroundColor: themeColor.bgColor(1) }}
                    className='absolute left-4 p-1 rounded-full shadow z-20 mt-5'>
                    <Icon.ArrowLeft strokeWidth={3} stroke={'white'} />
                </TouchableOpacity>
                <View>
                    <Text className='text-center font-bold text-xl'>Chọn địa điểm</Text>
                </View>
            </View>

            <MapView
                style={{ flex: 1 }}
                onPress={handleMapPress}
                initialRegion={{
                    latitude: 10.8231,
                    longitude: 106.6297,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {origin && <Marker coordinate={origin} title="Điểm bắt đầu" />}
                {destination && <Marker coordinate={destination} title="Điểm đến" />}
            </MapView>
            <View style={styles.infoContainer}>
                <Text>Điểm bắt đầu: {origin ? `${origin.latitude}, ${origin.longitude}` : 'Chưa chọn'}</Text>
                <Text>Điểm đến: {destination ? `${destination.latitude}, ${destination.longitude}` : 'Chưa chọn'}</Text>
                <Text>Tổng độ dài đường đi: {calculateDistance()} mét</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <Button title="Xóa điểm bắt đầu" onPress={clearOrigin} />
                    <Button title="Xóa điểm đến" onPress={clearDestination} />
                </View>
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm} className='mt-5'>
                    <Text style={styles.confirmButtonText}>Xác nhận địa điểm</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    infoContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    confirmButton: {
        backgroundColor: '#FB923C',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});