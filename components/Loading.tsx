import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { themeColor } from '@/theme'

const Loading = () => {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} color={"red"} />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({})