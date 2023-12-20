const Users = require("../model/User");

// Check a user is exists?
exports.checkAUserExits = async (email) => {
    const users = await Users.findOne({ email: email });
    return users;
}

// get all user
exports.findAllUserExits = async () => {
    const users = await Users.find({});
    return users;
}

// registration a user
exports.postRegUserServices = async (data) => {
    const user = await Users.create(data);
    return user;
}

exports.putUserAdminService = async (id) => {
    const user = await Users.updateOne({_id: id}, {$set: {role: "admin"}});
    return user;
}

// update user information
exports.updateUserInfoService = async (data) => {
    const updateUserInfo = await Users.findOne({ email: data?.email })
    const users = await Users.updateOne(updateUserInfo, data, {
        runValidators: true
    });
    return users;
}