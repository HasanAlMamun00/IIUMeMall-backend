const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
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
    },
    quantity: {
        type: Number,
    },
    totalPrice:{
        type: Number
    },
    order:{
        type: Number
    }
},
{
    timestamps: true
});

const Cart = mongoose.model("carts", CartItemSchema);
module.exports = Cart;