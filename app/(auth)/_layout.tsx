import React from 'react'
import { Stack } from 'expo-router'
import IndexScreen from '@/screens/IndexScreen'

export default function _layoutAuth() {
    return (
        <Stack>
            <Stack.Screen name='login' options={{headerShown: false}} />
            <Stack.Screen name='signup' options={{headerShown: false}} />
            <Stack.Screen name='welcome' options={{headerShown: false}} />
        </Stack>
    )
}