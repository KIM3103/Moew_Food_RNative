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
    { name: 'All', image: '/assets/images/categories/all-food.jpg' },
    { name: 'Pizza', image: '/assets/images/categories/pizza.png' },
    { name: 'Hamburger', image: '/assets/images/categories/hamburger.png' },
    { name: 'Bánh ngọt', image: '/assets/images/categories/cupcake.png' },
    { name: 'Mì', image: '/assets/images/categories/spaghetti.png' },
    { name: 'Thức ăn nhanh', image: '/assets/images/categories/takeout-box.png' },
    { name: 'Sinh tố', image: '/assets/images/categories/tropical-drink.png' },
    { name: 'Cá', image: '/assets/images/categories/tropical-fish.png' },
];

const featured = [
    {
        title: 'Cay Nóng Hấp Dẫn',
        description: 'Gà rán mềm và thơm ngon với nhiều món ngon khác',
        restaurants: [
            {
                name: 'Papa Johns',
                image: '/assets/images/restaurants/MenuPizza.jpg',
                description: 'Pizza cay nóng hấp dẫn',
                lng: 38.2145602,
                lat: -85.5324269,
                address: '434 Second Street',
                stars: 4,
                reviews: '4.4k',
                categories: ['Thức ăn nhanh', 'Pizza', 'All'],
                dishes: [
                    { name: 'Cá Chiên Giòn', description: 'Cá chiên giòn sốt chua ngọt', price: '120.000 VNĐ', image: '/assets/images/dishes/caChien.jpeg', favorite: false },
                    { name: 'Cơm Hàn Quốc', description: 'Cơm chuẩn vị Hàn Quốc', price: '220.000 VNĐ', image: '/assets/images/dishes/comKimBap.jpeg', favorite: true },
                    { name: 'Hamburger Thịt', description: 'Hamburger phong cách Mỹ', price: '75.000 VNĐ', image: '/assets/images/dishes/hambugger.jpeg', favorite: false },
                ],
            },
        ],
    },
    {
        title: 'Món Ngọt Tuyệt Vời',
        description: 'Món tráng miệng thơm ngon, béo ngậy',
        restaurants: [
            {
                name: 'Sweet Tooth',
                image: '/assets/images/restaurants/Sweet-Tooth.jpeg',
                description: 'Thiên đường của những món ngọt',
                lng: 40.712776,
                lat: -74.005974,
                address: '123 Dessert Lane',
                stars: 4.8,
                reviews: '2.1k',
                categories: ['Tráng miệng', 'Bánh ngọt', 'All'],
                dishes: [
                    { name: 'Bánh Socola', description: 'Bánh socola đậm đà và mềm mịn', price: '200.000 VNĐ', image: '/assets/images/dishes/socola-banh.jpg', favorite: true },
                    { name: 'Bánh Cheesecake Dâu', description: 'Bánh cheesecake béo ngậy, hòa quyện với dâu tây', price: '220.000 VNĐ', image: '/assets/images/dishes/BanhCheesecake-Dau.jpg', favorite: false },
                    { name: 'Macaron', description: 'Bánh Macaron kiểu Pháp với nhiều hương vị', price: '300.000 VNĐ', image: '/assets/images/dishes/Macaron.jpg', favorite: true },
                ],
            },
        ],
    },
    {
        title: 'Ăn Uống Lành Mạnh',
        description: 'Bữa ăn bổ dưỡng và thơm ngon',
        restaurants: [
            {
                name: 'Green Eats',
                image: '/assets/images/restaurants/Green-Eats.jpg',
                description: 'Thực phẩm tươi và hữu cơ',
                lng: 34.052235,
                lat: -118.243683,
                address: '567 Green Street',
                stars: 4.6,
                reviews: '3.5k',
                categories: ['Thực phẩm lành mạnh', 'Sinh tố', 'All'],
                dishes: [
                    { name: 'Salad Bơ', description: 'Salad bơ tươi với rau xanh và sốt dầu giấm', price: '250.000 VNĐ', image: '/assets/images/dishes/Salad-Bo.jpg', favorite: false },
                    { name: 'Tô Quinoa', description: 'Tô quinoa giàu protein với rau củ', price: '280.000 VNĐ', image: '/assets/images/dishes/To-Quinoa.png', favorite: true },
                    { name: 'Sinh Tố', description: 'Sinh tố trái cây kết hợp với sữa chua', price: '150.000 VNĐ', image: '/assets/images/dishes/Sinh-To.jpeg', favorite: false },
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
