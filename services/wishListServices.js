const Wishlist = require("../model/WishList");

// upload a wishlist product
exports.findWishlistExistServices = async (data) => {
    const wishlist = await Wishlist.findOne({ user_email: data.user_email, owner_email: data.owner_email, productName: data.productName, productImage: data.productImage, productPrice: data.productPrice, productType: data.productType, cafeId: data.cafeId, productId: data.productId });
    return wishlist;
}

// upload a wishlist product
exports.postWishlistServices = async (data) => {
    const wishlist = await Wishlist.create(data);
    return wishlist;
}

// get  wishlist item
exports.getWishlistServices = async (email) => {
    const wishlist = await Wishlist.find({user_email: email});
    return wishlist;
}

// delete a wishlist product
exports.deleteWishlistItemService = async (data) => {
    const deleteWishlist = await Wishlist.deleteOne({ user_email: data.user_email, owner_email: data.owner_email, productName: data.productName, productImage: data.productImage, productPrice: data.productPrice, productType: data.productType, cafeId: data.cafeId, productId: data.productId });
    return deleteWishlist;
}