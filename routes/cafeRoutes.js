const express = require("express");
const router = express.Router();
const cafeControllers = require("../controllers/cafeControllers");

// here cafe upload, get and updates her information routes,
router.route('/').get(cafeControllers.getAllCafeInfo).post(cafeControllers.postCafeItem).patch(cafeControllers.updateCafeInfo).delete(cafeControllers.deleteACafeInfo)

// get all search item
router.route('/search').get(cafeControllers.getAllSearchInfo)

// Find seller own product
router.route('/myProduct/:email').get(cafeControllers.getMyProductControllers)

// get a cafe information
router.route('/:cafeId').get(cafeControllers.getACafeInfo)

module.exports = router;