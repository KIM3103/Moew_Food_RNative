const Invoice = require('../models/Invoice');
const User = require('../models/User');
const Product = require('../models/Product');
const Dish = require('../models/Dish');


exports.createInvoice = async (req, res) => {
    try {
        const { userId } = req.params;
        const { items, deliveryFee, totalPrice, totalALL } = req.body;

        // Kiểm tra sự tồn tại của các món ăn
        for (const item of items) {
            const dish = await Dish.findById(item.dish);
            if (!dish) {
                return res.status(404).json({ success: false, message: 'Dish không tồn tại!' });
            }
        }

        // Tạo hóa đơn mới
        const newInvoice = new Invoice({
            user: userId,
            items,
            totalPrice,
            deliveryFee,
            totalALL
        });

        await newInvoice.save();

        res.status(201).json({ success: true, message: 'Hóa đơn đã được tạo!', invoice: newInvoice });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getInvoicesByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const invoices = await Invoice.find({ user: userId }).populate('items.dish');

        res.json({ success: true, invoices });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('items.dish');

        res.json({ success: true, invoices });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};