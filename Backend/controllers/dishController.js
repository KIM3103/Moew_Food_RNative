const Dish = require('../models/Dish');

// Tạo món ăn mới
exports.createDish = async (req, res) => {
    try {
        const { name, description, price, image, favorite } = req.body;
        const newDish = new Dish({ name, description, price, image, favorite });
        await newDish.save();
        res.status(201).json({ success: true, message: 'Món ăn đã được tạo!', dish: newDish });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Lấy danh sách tất cả các món ăn
exports.getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.json({ success: true, dishes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Lấy món ăn theo ID
exports.getDishById = async (req, res) => {
    try {
        const { dishId } = req.params;
        const dish = await Dish.findById(dishId);
        if (!dish) {
            return res.status(404).json({ success: false, message: 'Món ăn không tồn tại!' });
        }
        res.json({ success: true, dish });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Cập nhật món ăn theo ID
exports.updateDishById = async (req, res) => {
    try {
        const { dishId } = req.params;
        const { name, description, price, image, favorite } = req.body;
        const updatedDish = await Dish.findByIdAndUpdate(dishId, { name, description, price, image, favorite }, { new: true });
        if (!updatedDish) {
            return res.status(404).json({ success: false, message: 'Món ăn không tồn tại!' });
        }
        res.json({ success: true, message: 'Món ăn đã được cập nhật!', dish: updatedDish });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Xóa món ăn theo ID
exports.deleteDishById = async (req, res) => {
    try {
        const { dishId } = req.params;
        const deletedDish = await Dish.findByIdAndDelete(dishId);
        if (!deletedDish) {
            return res.status(404).json({ success: false, message: 'Món ăn không tồn tại!' });
        }
        res.json({ success: true, message: 'Món ăn đã được xóa!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};