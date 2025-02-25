const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true }, // Nếu muốn là số: { type: Number, required: true }
    image: { type: String, required: true },
    favorite: { type: Boolean, required: true }
});

const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    lng: { type: Number, required: true },
    lat: { type: Number, required: true },
    address: { type: String, required: true },
    stars: { type: Number, required: true },
    reviews: { type: String, required: true },
    categories: [{ type: String, required: true }], // Cập nhật từ `category` thành `categories`
    dishes: [DishSchema] // Danh sách món ăn
});

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    restaurants: [RestaurantSchema]
});

module.exports = mongoose.model('Product', ProductSchema);
