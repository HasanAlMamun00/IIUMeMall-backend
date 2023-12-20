const express = require("express");
const router = express.Router();
const cartControllers = require("../controllers/cartControllers");

// here cafe upload, get and updates her information routes,
router.route('/').post(cartControllers.postCartItem).delete(cartControllers.deleteACartCafeInfo).put(cartControllers.updateACartQuantity)

// single cart info
router.route('/single/:id').get(cartControllers.getSingleCartItem)

// get a wishlist information
router.route('/:email').get(cartControllers.getCartItem)

module.exports = router;