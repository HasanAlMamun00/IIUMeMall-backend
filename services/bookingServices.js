const Booking = require("../model/Booking");
const Cafe = require("../model/Cafe");

// upload a Booking product
exports.postBookingItemServices = async (data) => {
    const BookingItem = await Booking.create(data);
    return BookingItem;
}

// update a cafe
exports.updateSellerCafeItemService = async (data, productIdToUpdate, newQuantity) => {
    const updatedCafe = await Cafe.findOneAndUpdate(
        {
            _id: data?.cafeId,
            'item._id': productIdToUpdate,
        },
        {
            $inc: {
                'item.$.quantity': -newQuantity,
            },
        },
        { new: true }
    );
    return updatedCafe;
}


// get  Booking item
exports.getBookingItemServices = async (email) => {
    const BookingItem = await Booking.find({ user_email: email });
    return BookingItem;
}

// get Seller Booking item
exports.getSellerBookingItemServices = async (email) => {
    const BookingItem = await Booking.find({ owner_email: email });
    return BookingItem;
}

// update quantity
exports.putBookingQuantityService = async (data) => {
    const result = await Booking.updateOne({ _id: data.id }, { $set: { status: data.status } });
    return result;
}