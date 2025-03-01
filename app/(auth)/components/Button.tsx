import { Text, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'

import { ViewStyle, TextStyle } from 'react-native';
import { hp } from '@/helpers/common';
import { themeColor } from '@/theme';
import Loading from '@/components/Loading';

interface ButtonProps {
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
    title?: string;
    onPress?: () => void;
    loading?: boolean;
    hasShadow?: boolean;
}

export default function Button({
    buttonStyle,
    textStyle,
    title = '',
    onPress = () => { },
    loading = false,
    hasShadow = true,
}: ButtonProps) {
    const shadowStyle = {
        shadowColor: themeColor.bgColor(1),
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    }

    if (loading) {
        return (
            <View style={[styles.button, buttonStyle, { backgroundColor: 'white' }]}>
                <Loading />
            </View>
        )
    }

    return (
        <Pressable onPress={onPress} style={[styles.button, buttonStyle, hasShadow && shadowStyle]}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        height: hp(6.6),
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderCurve: 'continuous'
    },
    text: {
        fontSize: hp(2.5),
        color: themeColor.text,
        fontWeight: 'bold',
    },
});