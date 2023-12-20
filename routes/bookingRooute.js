const express = require("express");
const router = express.Router();
const bookingControllers = require("../controllers/bookingControllers");

// here booking upload and updates her information routes,
router.route('/').post(bookingControllers.postBookingItem).put(bookingControllers.updateBookingStatus)

// seller booking information
router.route('/seller/:email').get(bookingControllers.getSellerBookingItem)

// get customer booking information
router.route('/:email').get(bookingControllers.getCustomerBookingItem)

module.exports = router;