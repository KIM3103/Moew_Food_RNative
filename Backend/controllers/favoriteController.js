const User = require('../models/User');
const Product = require('../models/Product');

exports.addFavoriteDish = async (req, res) => {
    try {
        const { userId, dishId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User không tồn tại!' });
        }
        if (!user.favoriteDishes.includes(dishId)) {
            user.favoriteDishes.push(dishId);
            await user.save();
        }
        res.json({ success: true, message: 'Đã thêm món ăn yêu thích!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.removeFavoriteDish = async (req, res) => {
    try {
        const { userId, dishId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User không tồn tại!' });
        }
        user.favoriteDishes = user.favoriteDishes.filter(id => id.toString() !== dishId);
        await user.save();
        res.json({ success: true, message: 'Đã xóa món ăn yêu thích!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getFavoriteDishes = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User không tồn tại!' });
        }

        const favoriteDishes = await Product.find({ 'restaurants.dishes._id': { $in: user.favoriteDishes } }, { 'restaurants.$': 1 });

        const dishes = favoriteDishes.flatMap(product => 
            product.restaurants.flatMap(restaurant => 
                restaurant.dishes.filter(dish => user.favoriteDishes.includes(dish._id.toString()))
            )
        );

        res.json({ success: true, dishes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};