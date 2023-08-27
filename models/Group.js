const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    id: {
        type:String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        min: 3,
        max: 30,
        unique: false
    },
    members: [
        {
            type: String,
        }
    ],
    type: {
        type:String,
        required: true,
        unique: false
    },
    count: {
        type: Number,
        required: true,
        max:50
    },
    locked: {
        type: Boolean,
        required: true,
    },
    desc: {
        type: String,
        required: true,
        min: 3,
        max: 50
    }
});

module.exports = mongoose.model("Group", GroupSchema);