
const mongoose = require("mongoose");

// User Schema and connect DB collection
const cafesRegSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    item: [
        {
            name: String,
            price: Number,
            image: String,
            productType: String,
            quantity: Number
        }
    ]
},
    {
        timestamps: true
    })

const Cafe = mongoose.model("cafes", cafesRegSchema);

module.exports = Cafe;