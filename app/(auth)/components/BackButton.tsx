import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import * as Icon from "react-native-feather";
import { themeColor } from '@/theme';

export default function BackButton() {
    return (
        <Pressable onPress={() => router.back()} style={styles.button}>
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColor.text} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-start',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
})