const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, immutable: true },
    password: { type: String, required: true }, 
    avatar: { type: String, default: "" },
    location: { type: String, default: "" },
    bio: { type: String, default: "" },
});

module.exports = mongoose.model("User", UserSchema);
