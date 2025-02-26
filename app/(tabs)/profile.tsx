import { themeColor } from '@/theme';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileDetail = () => {
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatar}>RN</Text>
                    <Image
                        source={require('../../assets/images/cat_ava.jpg')}
                        style={{ width: 150, height: 150, borderRadius: 100, position: 'absolute' }} />
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>Kim</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Email:</Text>
                    <Text style={styles.infoText}>KIM.LNB22571@sinhvien.hoasen.edu.vn</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Location:</Text>
                    <Text style={styles.infoText}>Viet Nam</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Bio:</Text>
                    <Text style={styles.infoText}>Hello mọi người</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Portfolio:</Text>
                    <Text style={styles.infoText}>https://yourportfolio.com</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECF0F3',
    },
    body: {
        marginTop: 120,
        alignItems: 'center',
        justifyContent: 'center',
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
});

export default ProfileDetail;
