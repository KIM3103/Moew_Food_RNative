const User = require("../models/User");

// 📌 Lấy thông tin profile (ẩn password)
exports.getUserProfile = async (req, res) => {
    try {
        const { email } = req.params;

        // Tìm user theo email
        const user = await User.findById(userId).select("-password"); // Ẩn password
        if (!user) {
            return res.status(404).json({ success: false, message: "User không tồn tại!" });
        }

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 📌 Cập nhật profile (Không cho phép sửa email, không hiển thị password)
exports.updateUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, location, bio } = req.body;
        let avatar = req.file ? `/uploads/${req.file.filename}` : undefined;

        // Chỉ cập nhật các trường được gửi lên (không cập nhật email)
        const updatedFields = {};
        if (username !== undefined) updatedFields.username = username;
        if (location !== undefined) updatedFields.location = location;
        if (bio !== undefined) updatedFields.bio = bio;
        if (avatar !== undefined) updatedFields.avatar = avatar;

        const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, { new: true }).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User không tồn tại!" });
        }

        res.json({ success: true, message: "Cập nhật profile thành công!", user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
