const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
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
    totalPrice:{
        type: Number
    },
    order:{
        type: Number
    },
    transactionId: {
        type: String
    },
    cartId: {
        type: String
    },
    status: {
        type: String,
        default: 'booked'
    },
    payment_type: {
        type: String
    }
},
{
    timestamps: true
});

const Booking = mongoose.model("bookings", bookingSchema);
module.exports = Booking;