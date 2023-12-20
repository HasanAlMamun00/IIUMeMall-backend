const express = require("express");
const router = express.Router();
const contactUsControllers = require("../controllers/contactUsFormControllers");

// here user contact us get and post routes, 
router.route('/').post(contactUsControllers.postContactUsForm).get(contactUsControllers.getContactUsForm)
module.exports = router;