import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { themeColor } from '@/theme'
import RestaurantCard from '@/components/RestaurantCard';


interface FeaturedRowProps {
    title: string;
    description: string;
    restaurants: any;
}

export default function FeaturedRow({ title, description, restaurants }: FeaturedRowProps) {
    return (
        <View>
            <View className='flex-row items-center justify-between px-4'>
                <View>
                    <Text className='font-bold text-lg'>{title}</Text>
                    <Text className='text-gray-500 text-xs'>{description}</Text>
                </View>
                <TouchableOpacity>
                    <Text style={{ color: themeColor.text }} className='font-semibold'>See All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
                className='overflow-visible py-5'>
                {
                    restaurants.flatMap((restaurant: any, index: number) => {
                        return Array(3).fill(null).map((_, i) => (
                            <RestaurantCard item={restaurant} index={index} key={`${index}-${i}`} />
                        ));
                    })
                }
            </ScrollView>
        </View>
    )
}