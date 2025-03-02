import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign, Feather } from '@expo/vector-icons';
import TabBarButton from './TabBarButton';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { themeColor } from '@/theme';
import { useAtom } from 'jotai';
import { cartAtom } from '@/store';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const primaryColor = '#EA580C';
    const greyColor = '#FFFFFF';
    const [cart] = useAtom(cartAtom);

    const totalQuantity = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);

    return (
        <View style={styles.tabbar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    typeof options.tabBarLabel === 'string'
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                if (['_sitemap', '+not-found'].includes(route.name)) return null;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TabBarButton
                        key={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                        routeName={route.name as 'index' | 'cart' | 'bill' |'favorite' | 'profile'}
                        color={isFocused ? primaryColor : greyColor}
                        label={label}
                        totalQuantity={route.name === 'cart' ? totalQuantity : undefined} // Truyền totalQuantity
                    />
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        bottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: themeColor.bgColor(.8),
        marginHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 25,
        borderCurve: 'continuous',
        shadowColor: 'black',
        borderWidth: 1,
        borderColor: themeColor.bgColor(.5),
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1
    },
})

export default TabBar