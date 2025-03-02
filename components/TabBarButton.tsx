import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { icons } from '../assets/icons';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface TabBarButtonProps {
    isFocused: boolean;
    label: string;
    routeName: 'index' | 'cart' | 'bill' |'favorite' | 'profile';
    color: string;
    onPress: () => void;
    onLongPress: () => void;
    totalQuantity?: number; // Thêm prop này
}

const TabBarButton = (props: TabBarButtonProps) => {
    const { isFocused, label, routeName, color, totalQuantity } = props;

    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(
            typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
            { duration: 350 }
        );
    }, [scale, isFocused]);

    const animatedIconStyle = useAnimatedStyle(() => {

        const scaleValue = interpolate(
            scale.value,
            [0, 1],
            [1, 1.4]
        );
        const top = interpolate(
            scale.value,
            [0, 1],
            [0, 8]
        );

        return {
            // styles
            transform: [{ scale: scaleValue }],
            top
        }
    })
    const animatedTextStyle = useAnimatedStyle(() => {

        const opacity = interpolate(
            scale.value,
            [0, 1],
            [1, 0]
        );

        return {
            // styles
            opacity
        }
    })
    return (
        <Pressable {...props} style={styles.container}>
            <Animated.View style={[animatedIconStyle]}>
                {
                    icons[routeName]({
                        color
                    })
                }
                {routeName === 'cart' && totalQuantity > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{totalQuantity}</Text>
                    </View>
                )}
            </Animated.View>

            <Animated.Text style={[{
                color,
                fontSize: 11
            }, animatedTextStyle]}>
                {label}
            </Animated.Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -10,
        backgroundColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    }
})

export default TabBarButton