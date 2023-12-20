const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String
    },
},
{
    timestamps: true
});

const ContactUs = mongoose.model("contactus", contactUsSchema);
module.exports = ContactUs;