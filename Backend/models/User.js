const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, immutable: true },
    password: { type: String, required: true }, 
    avatar: { type: String, default: "" },
    location: { type: String, default: "" },
    bio: { type: String, default: "" },
    favoriteDishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }] // Danh sách món ăn yêu thích
});

module.exports = mongoose.model("User", UserSchema);
