const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Category = require('./models/Category');
const Product = require('./models/Product');

// Load biến môi trường từ .env
dotenv.config();

// Kết nối MongoDB
connectDB();

// Dữ liệu mẫu
const categories = [
    { name: 'Pizza', image: '/assets/images/categories/pizza.png' },
    { name: 'Hamburger', image: '/assets/images/categories/hamburger.png' },
    { name: 'Cupcake', image: '/assets/images/categories/cupcake.png' },
    { name: 'Spaghetti', image: '/assets/images/categories/spaghetti.png' },
    { name: 'Takeout Box', image: '/assets/images/categories/takeout-box.png' },
    { name: 'Tropical Drink', image: '/assets/images/categories/tropical-drink.png' },
    { name: 'Tropical Fish', image: '/assets/images/categories/tropical-fish.png' },
];

const featured = [
    {
        title: 'Hot and Spicy',
        description: 'Soft and tender fried chicken',
        restaurants: [
            {
                name: 'Papa Johns',
                image: '/assets/images/restaurants/MenuPizza.jpg',
                description: 'Hot and spicy pizzas',
                lng: 38.2145602,
                lat: -85.5324269,
                address: '434 Second Street',
                stars: 4,
                reviews: '4.4k',
                category: 'Fast Food',
                dishes: [
                    { name: 'Cá Chiên Giòn', description: 'Cá Chiên Giòn sốt chua ngọt', price: '120.000 VNĐ', image: '/assets/images/dishes/caChien.jpeg' },
                    { name: 'Cơm Hàn Quốc', description: 'Cơm chuẩn vị Hàn Quốc', price: '220.000 VNĐ', image: '/assets/images/dishes/comKimBap.jpeg' },
                    { name: 'Hamburger Thịt', description: 'Phong cách chuẩn Mỹ', price: '75.000 VNĐ', image: '/assets/images/dishes/hambugger.jpeg' },
                ],
            },
        ],
    },
    {
        title: 'Sweet Delights',
        description: 'Delicious and creamy desserts',
        restaurants: [
            {
                name: 'Sweet Tooth',
                image: '/assets/images/restaurants/MenuComBinhDan.jpg',
                description: 'Heavenly sweet treats',
                lng: 40.712776,
                lat: -74.005974,
                address: '123 Dessert Lane',
                stars: 4.8,
                reviews: '2.1k',
                category: 'Desserts',
                dishes: [
                    { name: 'Chocolate Cake', description: 'Rich and moist chocolate cake', price: '8 USD', image: '/assets/images/dishes/hoanhThanhChien.jpeg' },
                    { name: 'Strawberry Cheesecake', description: 'Creamy and fruity delight', price: '9 USD', image: '/assets/images/dishes/cheeseFried.jpeg' },
                    { name: 'Macarons', description: 'French classic with various flavors', price: '12 USD', image: '/assets/images/dishes/banhTacoz.jpeg' },
                ],
            },
        ],
    },
    {
        title: 'Healthy Bites',
        description: 'Nutritious and tasty meals',
        restaurants: [
            {
                name: 'Green Eats',
                image: '/assets/images/restaurants/menuDaDangMon.webp',
                description: 'Fresh and organic meals',
                lng: 34.052235,
                lat: -118.243683,
                address: '567 Green Street',
                stars: 4.6,
                reviews: '3.5k',
                category: 'Healthy Food',
                dishes: [
                    { name: 'Avocado Salad', description: 'Fresh avocado with greens and vinaigrette', price: '11 USD', image: '/assets/images/dishes/xienQue.jpeg' },
                    { name: 'Quinoa Bowl', description: 'High-protein bowl with vegetables', price: '13 USD', image: '/assets/images/dishes/nuoiSotCaChua.jpeg' },
                    { name: 'Smoothie', description: 'Refreshing blend of fruits and yogurt', price: '7 USD', image: '/assets/images/dishes/cheeseFried.jpeg' },
                ],
            },
        ],
    },
];

// Hàm nhập dữ liệu vào MongoDB
const importData = async () => {
    try {
        await Category.deleteMany();
        await Product.deleteMany();

        await Category.insertMany(categories);
        await Product.insertMany(featured);

        console.log('✅ Dữ liệu mẫu đã được nhập thành công!');
        process.exit();
    } catch (error) {
        console.error('❌ Lỗi khi nhập dữ liệu mẫu:', error);
        process.exit(1);
    }
};

// Chạy importData
importData();
