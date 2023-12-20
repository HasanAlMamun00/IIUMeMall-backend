const { postContactUsServices, getContactUsServices } = require("../services/conactUsServices");
const sendResponse = require("../shared/sendResponse");

// upload Comntact Us
exports.postContactUsForm = async (req, res) => {
    try {
        const data = req.body;

        const result = await postContactUsServices(data);

        if (!result) {
            sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'Contact us Not Added. Something Wrong'
            });
        } else {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'Contact us form Added Successfully',
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

// get Comntact Us
exports.getContactUsForm = async (req, res) => {
    try {
        const result = await getContactUsServices();

        if (!result) {
            sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'Contact us Not Get. Something Wrong'
            });
        } else {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'Contact us form Get Successfully',
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