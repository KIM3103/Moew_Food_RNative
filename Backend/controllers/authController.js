const User = require("../models/User");

// 📌 Đăng ký User
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email đã tồn tại!" });
        }

        // Tạo user mới
        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ success: true, message: "Đăng ký thành công!", user: { email } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 📌 Đăng nhập User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra email có tồn tại không
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).json({ success: false, message: "Sai email hoặc mật khẩu!" });
        }

        res.json({ success: true, message: "Đăng nhập thành công!", user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
