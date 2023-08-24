const mongoose = require("mongoose");

const SubGroupSchema = new mongoose.Schema({
    id: {
        type:String,
        required: true,
        unique: true
    },
    groupId: {
        type: String,
        required: true,
        unique: false
    },
    members: [
        {
            type: String,
        }
    ],
    count: {
        type: Number,
        required: true,
        max:50
    }
});

module.exports = mongoose.model("SubGroup", SubGroupSchema);