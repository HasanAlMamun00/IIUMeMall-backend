
const { postBookingItemServices, getBookingItemServices, getSellerBookingItemServices, updateSellerCafeItemService, putBookingQuantityService } = require("../services/bookingServices");
const sendResponse = require("../shared/sendResponse");

// upload Booking item
exports.postBookingItem = async (req, res) => {
    try {
        const data = req.body;

        const productIdToUpdate = data?.productId;
        const newQuantity = parseInt(data?.order);
        const updateSellerQuantity = await updateSellerCafeItemService(data, productIdToUpdate, newQuantity)

        if (updateSellerQuantity) {
            const result = await postBookingItemServices(data);

            if (!result) {
                sendResponse(res, {
                    statusCode: 400,
                    success: false,
                    message: 'Booking Item Not Added. Something Wrong'
                });
            } else {
                sendResponse(res, {
                    statusCode: 200,
                    success: true,
                    message: 'Booking Item Added Successfully',
                    data: result
                });
            }
        } else {
            sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'Booking Item Not Added. Something Wrong'
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

// Get Booking item
exports.getCustomerBookingItem = async (req, res) => {
    try {
        const { email } = req.params;

        const result = await getBookingItemServices(email);

        if (!result) {
            sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'Booking Item Get Failed.'
            });
        } else {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'Booking Item Get Successfully',
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

// Get a Seller Booking item
exports.getSellerBookingItem = async (req, res) => {
    try {
        const { email } = req.params;

        const result = await getSellerBookingItemServices(email);

        if (!result) {
            sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'Booking Item Get Failed.'
            });
        } else {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'Booking Item Get Successfully',
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

// update A Booking  item Status
exports.updateBookingStatus = async (req, res) => {
    try {
        const data = req.body;

        const updatedBooking = await putBookingQuantityService(data);

        if (!updatedBooking) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'Update Status Failed'
            });
        }
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Successfully Update Status'
        });

    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Something went Wrong'
        });
    }
}
