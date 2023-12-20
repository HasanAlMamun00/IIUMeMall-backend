const ContactUs = require("../model/ContactUs");

// upload a Contact Us
exports.postContactUsServices = async (data) => {
    const contactUsForm = await ContactUs.create(data);
    return contactUsForm;
}

// get a Contact Us
exports.getContactUsServices = async () => {
    const contactUsForm = await ContactUs.find({});
    return contactUsForm;
}