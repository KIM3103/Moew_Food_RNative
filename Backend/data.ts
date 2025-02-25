export const categories = [
    {
        id: 1,
        name: 'Pizza',
        image: require('../assets/images/categories/pizza.png')
    },
    {
        id: 2,
        name: 'Hamburger',
        image: require('../assets/images/categories/hamburger.png')
    },
    {
        id: 3,
        name: 'Cupcake',
        image: require('../assets/images/categories/cupcake.png')
    },
    {
        id: 4,
        name: 'Spaghetti',
        image: require('../assets/images/categories/spaghetti.png')
    },
    {
        id: 5,
        name: 'Takeout Box',
        image: require('../assets/images/categories/takeout-box.png')
    },
    {
        id: 6,
        name: 'Tropical Drink',
        image: require('../assets/images/categories/tropical-drink.png')
    },
    {
        id: 7,
        name: 'Tropical Fish',
        image: require('../assets/images/categories/tropical-fish.png')
    }
]

export const featured = [
    {
        id: 1,
        title: 'Hot and Spicy',
        description: 'Soft and tender fried chicken',
        restaurants: [
            {
                id: 1,
                name: 'Papa Johns',
                image: require('../assets/images/restaurants/MenuPizza.jpg'),
                description: 'Hot and spicy pizzas',
                lng: 38.2145602,
                lat: -85.5324269,
                address: '434 Second Street',
                stars: 4,
                reviews: '4.4k',
                category: 'Fast Food',
                dishes: [
                    {
                        id: 1,
                        name: 'Cá Chiên Giòn',
                        description: 'Cá Chiên Giòn sốt chua ngọt',
                        price: "120.000 VNĐ",
                        image: require('../assets/images/dishes/caChien.jpeg')
                    },
                    {
                        id: 2,
                        name: 'Cơm Hàn Quốc',
                        description: 'Cơm chuẩn vị Hàn Quốc',
                        price: "220.000 VNĐ",
                        image: require('../assets/images/dishes/comKimBap.jpeg')
                    },
                    {
                        id: 3,
                        name: 'Hamburger Thịt',
                        description: 'Phong cách chuẩn Mỹ',
                        price: "75.000 VNĐ",
                        image: require('../assets/images/dishes/hambugger.jpeg')
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        title: 'Sweet Delights',
        description: 'Delicious and creamy desserts',
        restaurants: [
            {
                id: 2,
                name: 'Sweet Tooth',
                image: require('../assets/images/restaurants/MenuComBinhDan.jpg'),
                description: 'Heavenly sweet treats',
                lng: 40.712776,
                lat: -74.005974,
                address: '123 Dessert Lane',
                stars: 4.8,
                reviews: '2.1k',
                category: 'Desserts',
                dishes: [
                    {
                        id: 4,
                        name: 'Chocolate Cake',
                        description: 'Rich and moist chocolate cake',
                        price: 8,
                        image: require('../assets/images/dishes/hoanhThanhChien.jpeg')
                    },
                    {
                        id: 5,
                        name: 'Strawberry Cheesecake',
                        description: 'Creamy and fruity delight',
                        price: 9,
                        image: require('../assets/images/dishes/cheeseFried.jpeg')
                    },
                    {
                        id: 6,
                        name: 'Macarons',
                        description: 'French classic with various flavors',
                        price: 12,
                        image: require('../assets/images/dishes/banhTacoz.jpeg'),
                        favorite: false
                    },
                ],
            },
        ],
    },
    {
        id: 3,
        title: 'Healthy Bites',
        description: 'Nutritious and tasty meals',
        restaurants: [
            {
                id: 3,
                name: 'Green Eats',
                image: require('../assets/images/restaurants/menuDaDangMon.webp'),
                description: 'Fresh and organic meals',
                lng: 34.052235,
                lat: -118.243683,
                address: '567 Green Street',
                stars: 4.6,
                reviews: '3.5k',
                category: 'Healthy Food',
                dishes: [
                    {
                        id: 7,
                        name: 'Avocado Salad',
                        description: 'Fresh avocado with greens and vinaigrette',
                        price: 11,
                        image: require('../assets/images/dishes/xienQue.jpeg'),
                        favorite: false
                    },
                    {
                        id: 8,
                        name: 'Quinoa Bowl',
                        description: 'High-protein bowl with vegetables',
                        price: 13,
                        image: require('../assets/images/dishes/nuoiSotCaChua.jpeg'),
                        favorite: true
                    },
                    {
                        id: 9,
                        name: 'Smoothie',
                        description: 'Refreshing blend of fruits and yogurt',
                        price: 7,
                        image: require('../assets/images/dishes/cheeseFried.jpeg'),
                        favorite: false
                    },
                ],
            },
        ],
    },
];