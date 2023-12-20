
const mongoose = require("mongoose");

// User Schema and connect DB collection
const usersRegSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true,
        validate: {
            validator: (value) => {
                const emailRegex = /@/
                return emailRegex.test(value);
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    phone: {
        type: String
    },
    role: {
        type: String,
        default: "customer",
    },
    date_birth: {
        type: String,
    },
    address: {
        type: String
    }
},
{
    timestamps: true
})

const Users = mongoose.model("users", usersRegSchema);

module.exports = Users;