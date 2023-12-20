
const { postWishlistServices, deleteWishlistItemService, getWishlistServices, findWishlistExistServices } = require("../services/wishListServices");
const sendResponse = require("../shared/sendResponse");

// upload wishlist item in cafe
exports.postWishListCafeItem = async (req, res) => {
    try {
        const data = req.body;

        const findExist = await findWishlistExistServices(data);
        if(findExist){
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'Already Added'
            });
        }

        const result = await postWishlistServices(data);

        if (!result) {
            sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'wishlist Item Not Added. Something Wrong'
            });
        } else {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'wishlist Item Added Successfully',
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

// get wishlist item in cafe
exports.getWishListCafeItem = async (req, res) => {
    try {
        const {email} = req.params;

        const result = await getWishlistServices(email);

        if (!result) {
            sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'wishlist Item Get Failed.'
            });
        } else {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'wishlist Item Get Successfully',
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

// delete A wishlist Cafe item
exports.deleteAWishListCafeInfo = async (req, res) => {
    try {
        const data = req.body;

        const updatedCafe = await deleteWishlistItemService(data);

        if (!updatedCafe) {
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