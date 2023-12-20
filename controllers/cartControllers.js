
const { postCartItemServices, getCartItemServices, deleteCartItemItemService, putCartQuantityService, getSingleCartItemServices } = require("../services/cartServices");
const sendResponse = require("../shared/sendResponse");

// upload Cart item
exports.postCartItem = async (req, res) => {
    try {
        const data = req.body;

        const result = await postCartItemServices(data);

        if (!result) {
            sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'Cart Item Not Added. Something Wrong'
            });
        } else {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'Cart Item Added Successfully',
                data: result
            });
        }

    } catch (error) {
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Something went Wrong'
        });
    }
};

// Get Cart item
exports.getCartItem = async (req, res) => {
    try {
        const {email} = req.params;

        const result = await getCartItemServices(email);

        if (!result) {
            sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'Cart Item Get Failed.'
            });
        } else {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'Cart Item Get Successfully',
                data: result
            });
        }

    } catch (error) {
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Something went Wrong'
        });
    }
};

// Get a single Cart item
exports.getSingleCartItem = async (req, res) => {
    try {
        const {id} = req.params;

        const result = await getSingleCartItemServices(id);

        if (!result) {
            sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'Cart Item Get Failed.'
            });
        } else {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'Cart Item Get Successfully',
                data: result
            });
        }

    } catch (error) {
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Something went Wrong'
        });
    }
};

// update A Cart  item quantity
exports.updateACartQuantity = async (req, res) => {
    try {
        const data = req.body;

        const updatedCart = await putCartQuantityService(data);

        if (!updatedCart) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'Update Quantity Failed'
            });
        }
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Successfully Update Quantity'
        });

    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Something went Wrong'
        });
    }
}

// delete A Cart Cafe item
exports.deleteACartCafeInfo = async (req, res) => {
    try {
        const { id } = req.body;

        const deleteCart = await deleteCartItemItemService(id);

        if (!deleteCart) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'Delete Failed'
            });
        }
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Successfully Delete'
        });

    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Something went Wrong'
        });
    }
}