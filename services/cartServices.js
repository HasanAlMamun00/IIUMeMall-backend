const Cart = require("../model/Cart");


// upload a Cart product
exports.postCartItemServices = async (data) => {
    const CartItem = await Cart.create(data);
    return CartItem;
}

// get  Cart item
exports.getCartItemServices = async (email) => {
    const CartItem = await Cart.find({user_email: email});
    return CartItem;
}

// get single Cart item
exports.getSingleCartItemServices = async (id) => {
    const cartItem = await Cart.findOne({_id: id});
    return cartItem;
}

// update quantity
exports.putCartQuantityService = async (data) => {
    const result = await Cart.updateOne({_id: data._id}, {$set: {order: data.order, totalPrice: data.totalPrice}});
    return result;
}

// delete a Cart product
exports.deleteCartItemItemService = async (id) => {
    const deleteCartItem = await Cart.deleteOne({ _id: id });
    return deleteCartItem;
}