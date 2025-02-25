import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as Icon from "react-native-feather";
import { themeColor } from '@/theme';
import Categories from '@/components/Categories';
import FeaturedRow from '@/components/FeaturedRow';
// import { featured } from '@/constants';
import { useAtom } from 'jotai';
import { productsAtom } from '@/store';
import { API_URL } from '@env';
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
    const [products, setProducts] = useAtom(productsAtom);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredByCategory, setFilteredByCategory] = useState(products);
    const [searchResults, setSearchResults] = useState(products);
    const navigation = useNavigation<any>();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/api/products`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Lỗi khi lấy products:", error);
            }
        };

        fetchProducts();
    }, []);

    // Xử lý lọc theo category
    useEffect(() => {
        const filtered = products.filter(product =>
            selectedCategory
                ? product.restaurants.some(restaurant =>
                    restaurant.categories &&
                    restaurant.categories.includes(selectedCategory)
                )
                : true
        );
        setFilteredByCategory(filtered);
    }, [selectedCategory, products]);

    // Xử lý tìm kiếm
    useEffect(() => {
        const results = products.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.restaurants.some(restaurant =>
                restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                restaurant.dishes.some(dish =>
                    dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    dish.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
            )
        );
        setSearchResults(results);
    }, [searchQuery, products]);

    // Hiển thị kết quả dựa vào điều kiện
    const displayedProducts = searchQuery ? searchResults : filteredByCategory;

    const handleCategorySelect = (categoryName: string | null) => {
        setSelectedCategory(categoryName);
    };

    return (
        <SafeAreaView className='bg-white flex-1'>
            <StatusBar style="dark" />
            {/* Search bar */}
            <View className='flex-row items-center space-x-2 px-4 pb-2 gap-2'>
                <View className='flex-row items-center p-2 rounded-full border border-gray-300 flex-1'>
                    <Icon.Search height='25' width='25' stroke='gray' />
                    <TextInput
                        placeholder='Search restaurants'
                        className='ml-2 flex-1'
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <View className='flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300'>
                        <Icon.MapPin height='20' width='20' stroke='gray' />
                        <Text className='text-gray-600 text-sm'>VietNam, HCM</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'red' }} className='p-3 rounded-full'>
                <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
                    <Icon.Heart height="20" width='20' strokeWidth={2.5} stroke="white" />
                </TouchableOpacity>
                </View>
            </View>

            {/* main */}
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 20
                }}>
                {/* Categories  */}
                <Categories onSelectCategory={handleCategorySelect} />

                {/* Featured */}
                <View className='mt-5'>
                    {
                        displayedProducts.map((item, index) => {
                            return (
                                <FeaturedRow
                                    key={index}
                                    title={item.title}
                                    restaurants={item.restaurants}
                                    description={item.description}>
                                </FeaturedRow>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}