import { View, Text, ScrollView, Image, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
// import { categories } from '@/constants';
import { useAtom } from 'jotai';
import { categoriesAtom } from '@/store';
import { API_URL } from '@env';

export default function Categories() {
    const [activeCategory, setActiveCategory] = React.useState<string | null>(null);

    const [categories, setCategories] = useAtom(categoriesAtom);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_URL}/api/categories`);
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh mục:", error);
            }
        };

        fetchCategories();
    }, []);


    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className='overflow-visible'
                contentContainerStyle={{ paddingHorizontal: 15 }}>
                {categories.map((category, index) => {
                    let isActive = category._id === activeCategory;
                    let btnClass = isActive ? 'bg-gray-600' : 'bg-gray-200';
                    let textClass = isActive ? 'font-semibold text-gray-800' : 'text-gray-500';

                    return (
                        <View key={index} className='flex justify-between items-center mr-6'>
                            <TouchableOpacity onPress={() => setActiveCategory(category._id)}
                                className={'p-1 rounded-full shadow bg-gray-200' + btnClass}>
                                <Image style={{ width: 45, height: 45 }} source={{ uri: `${API_URL}${category.image}` }} />
                            </TouchableOpacity>
                            <Text className={'text-sm' + textClass}>{category.name}</Text>
                        </View>
                    )
                })}
            </ScrollView >
        </View >
    )
}