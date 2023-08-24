const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: {
        type:String,
        required: true,
        unique: true
    },
    name: {
        type:String,
        required: true,
        min:3,
        max:20,
        unique: false
    },
    year: {
        type:String,
        required: true,
        unique:false
    },
    major: {
        type:String,
        required: true,
        min:3,
        max:20,
        unique:false
    },
    avatar: {
        type:String,
        required: true
    },
    groups: [
        {
            type: String,
        },
    ]
});

module.exports = mongoose.model("User", UserSchema);