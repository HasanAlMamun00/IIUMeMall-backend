
const mongoose = require("mongoose");

// wishlist Schema and connect DB collection
const wishListSchema = new mongoose.Schema({
    user_email: {
        type: String,
        required: true,
    },
    owner_email: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    cafeId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

const Wishlist = mongoose.model("wishlists", wishListSchema);

module.exports = Wishlist;