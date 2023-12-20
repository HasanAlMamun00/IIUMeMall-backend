const Cafe = require("../model/Cafe");
const { postCafeServices, updateCafeItemService, getAllCafeItem, getACafeItem, deleteCafeItemService, checkAUserExits, checkACafeIsExist, updateCafe, getMyProductServices, getAllSearchItem } = require("../services/cafeServices");
const sendResponse = require("../shared/sendResponse");

// upload item in cafe
exports.postCafeItem = async (req, res) => {
    try {
        const data = req.body;
        const checkUser = await checkAUserExits(data?.email);

        if (!checkUser || checkUser.role === 'user') {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'You have no access to add a product.'
            });
        }

        const checkCafeIsExist = await checkACafeIsExist(checkUser._id);

        if (!checkCafeIsExist) {
            const postData = {
                userId: checkUser._id,
                item: [
                    {
                        name: data?.name,
                        price: data?.price,
                        image: data?.image,
                        productType: data?.productType,
                        quantity: data?.quantity
                    }
                ]
            };

            const result = await postCafeServices(postData);

            if (!result) {
                sendResponse(res, {
                    statusCode: 400,
                    success: false,
                    message: 'Cafe Item Not Added. Something Wrong'
                });
            } else {
                sendResponse(res, {
                    statusCode: 200,
                    success: true,
                    message: 'Cafe Item Added Successfully',
                    data: result
                });
            }
        } else {
            // Update the existing cafe's item array
            checkCafeIsExist.item.push({
                name: data?.name,
                price: data?.price,
                image: data?.image,
                productType: data?.productType,
                quantity: data?.quantity
            });

            const updatedCafe = await updateCafe(checkCafeIsExist._id, {
                $set: { item: checkCafeIsExist.item }
            });

            if (!updatedCafe) {
                sendResponse(res, {
                    statusCode: 400,
                    success: false,
                    message: 'Cafe Item Not Added. Something Wrong'
                });
            } else {
                sendResponse(res, {
                    statusCode: 200,
                    success: true,
                    message: 'Cafe Item Added Successfully',
                    data: updatedCafe
                });
            }
        }

    } catch (error) {
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Something went Wrong'
        });
    }
};

// Get All Cafe information
exports.getAllCafeInfo = async (req, res) => {
    try {
        const { productType } = req.query;
        const result = await getAllCafeItem(productType);
        if (!result) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'Nothing Found'
            });
        }
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Successfully Get',
            data: result
        });

    } catch (error) {
        console.log(error);
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Something went Wrong'
        });
    }
}

// Get All Search information
exports.getAllSearchInfo = async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const result = await getAllSearchItem(searchTerm);
        if (!result) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'Nothing Found'
            });
        }
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Successfully Get',
            data: result
        });

    } catch (error) {
        console.log(error);
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Something went Wrong'
        });
    }
}

// Get A Cafe information
exports.getACafeInfo = async (req, res) => {
    try {
        const cafeId = req.params.cafeId;
        const itemId = req.query.itemId;
        const result = await getACafeItem(cafeId, itemId);
        if (!result) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'Nothing Found'
            });
        }
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Successfully Get',
            data: result
        });

    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Something went Wrong'
        });
    }
}

exports.getMyProductControllers = async (req, res) => {
    try {
        const { email } = req.params;
        const userdata = await checkAUserExits(email);
        const userId = userdata._id;
        const result = await getMyProductServices(userId);
        if (!result) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'Nothing Found'
            });
        }
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Successfully Get',
            data: result
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Something went Wrong'
        });
    }
}

// delete A Cafe item
exports.deleteACafeInfo = async (req, res) => {
    try {
        const { cafeId, productId } = req.body;

        const findCafeInfo = await Cafe.findOne({ _id: cafeId })
        const itemdata = findCafeInfo.item.filter(data => data._id != productId);

        const updatedCafe = await deleteCafeItemService(cafeId, {
            $set: { item: itemdata }
        });

        if (!updatedCafe) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'Nothing Found'
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

// Update cafe item information
exports.updateCafeInfo = async (req, res) => {
    try {
        const data = req.body;
        const productIdToUpdate = data?.productId;
        const newPrice = parseInt(data.price);
        const newQuantity = parseInt(data.quantity);
        const result = await updateCafeItemService(data, productIdToUpdate, newPrice, newQuantity)

        if (result) {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'Successfully Updated',
                data: result
            });
        } else {
            sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'Updated Failed'
            });
        }

    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Something went Wrong'
        });
    }
}