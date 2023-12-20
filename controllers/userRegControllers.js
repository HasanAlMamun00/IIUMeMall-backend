
const { checkAUserExits, postRegUserServices, updateUserInfoService, findAllUserExits, putUserAdminService } = require("../services/userRegServices");
const sendResponse = require("../shared/sendResponse");

// registration a user
exports.postRegUser = async (req, res) => {
    try {
        const data = req.body;
        const inserted = await checkAUserExits(data?.email);
        if (inserted != null) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'Previously Added'
            });
        }
        const postUser = await postRegUserServices(data);
        if (!postUser) {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'User Not Added. Something Wrong'
            });
        }
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'User Added Successfully',
            data: postUser
        });

    } catch (error) {
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Something went Wrong'
        });
    }
}

// Update his user information
exports.updateUserInfo = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await updateUserInfoService(data);
        if (result?.modifiedCount > 0) {
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

// Get User information
exports.getUserInfo = async (req, res) => {
    try {
        const email = req.params.email;
        const result = await checkAUserExits(email);
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

// Get All User information
exports.getAllUserControllers = async (req, res) => {
    try {
        const result = await findAllUserExits();
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

// update user role admin
exports.putUserRoleControllers = async (req, res) => {
    try {
        const {id} = req.body;
        const result = await putUserAdminService(id);
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
            message: 'Successfully Update',
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