const express = require("express");
const router = express.Router();
const wishlistControllers = require("../controllers/wishListControllers");

// here cafe upload, get and updates her information routes,
router.route('/').post(wishlistControllers.postWishListCafeItem).delete(wishlistControllers.deleteAWishListCafeInfo)

// get a wishlist information
router.route('/:email').get(wishlistControllers.getWishListCafeItem)

module.exports = router;