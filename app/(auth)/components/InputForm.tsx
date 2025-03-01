import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { hp } from '@/helpers/common';
import { themeColor } from '@/theme';

interface InputFormProps {
    containerStyle?: object;
    icon?: React.ReactNode;
    inputRef?: React.RefObject<TextInput>;
    [key: string]: any;
}

export default function InputForm(props: InputFormProps) {
    return (
        <View style={[styles.container, props.containerStyle && props.containerStyle]}>
            {
                props.icon && props.icon
            }
            <TextInput
                style={{ flex: 1 }}
                ref={props.inputRef && props.inputRef}
                {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: hp(7.2),
        borderWidth: 1,
        borderColor: themeColor.bgColor(0.5),
        // backgroundColor: 'rgba(0, 0, 0, 0.1)',
        backgroundColor: themeColor.bgColor(0.1),
        borderRadius: 10,
        paddingHorizontal: 18,
        gap: 12,
        borderCurve: 'continuous'
    },
});