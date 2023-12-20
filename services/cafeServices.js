const mongoose = require("mongoose");
const Cafe = require("../model/Cafe");
const Users = require("../model/User");

// Check a user is exists?
exports.checkAUserExits = async (email) => {
    const users = await Users.findOne({ email: email });
    return users;
}

// check a cafe is exists
exports.checkACafeIsExist = async (userId) => {
    const checkACafeIsExist = await Cafe.findOne({ userId: userId });
    return checkACafeIsExist;
}

// upload product
exports.postCafeServices = async (data) => {
    const cafe = await Cafe.create(data);
    return cafe;
}

// Update an existing cafe
exports.updateCafe = async (cafeId, newData) => {
    const updatedCafe = await Cafe.findByIdAndUpdate(cafeId, newData, { runValidators: true });
    return updatedCafe;
};

// Check a user is exists?
exports.getMyProductServices = async (userId) => {
    const myProduct = await Cafe.findOne({ userId: userId });
    return myProduct;
}

// get all cafe item
exports.getAllCafeItem = async (productType) => {
    const getAllCafeData = await Cafe.find({}).populate('userId');

    const sendData = getAllCafeData.map((data) => ({
        cafeId: data._id,
        userInfo: {
            userName: data?.userId?.name ? data?.userId?.name : '',
            userEmail: data?.userId?.email,
        },
        productData: data?.item?.filter(item => item?.productType === productType).map((data) => ({
            name: data?.name,
            price: data?.price,
            image: data?.image,
            productType: data?.productType,
            _id: data?._id,
            quantity: data?.quantity
        }))
    })).filter(item => item.productData.length > 0);

    return sendData;
}

exports.getAllSearchItem = async (searchTerm) => {
    const getAllCafeData = await Cafe.find({}).populate('userId');
    const sendData = getAllCafeData.map((data) => ({
        cafeId: data._id,
        userInfo: {
            userName: data?.userId?.name ? data?.userId?.name : '',
            userEmail: data?.userId?.email,
        },
        productData: data?.item?.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())).map((data) => ({
            name: data?.name,
            price: data?.price,
            image: data?.image,
            productType: data?.productType,
            _id: data?._id,
            quantity: data?.quantity
        }))
    })).filter(item => item.productData.length > 0);

    return sendData;
}


// get a cafe item
exports.getACafeItem = async (cafeId, itemId) => {
    const getACafeData = await Cafe.findOne({ _id: cafeId }).populate('userId');
    const userData = getACafeData.userId
    const itemDatas = getACafeData.item;
    const itemdata = itemDatas.find(data => data._id == itemId);
    const itemUserInfo = { userData, itemdata }
    return itemUserInfo;
}

// delete a cafe
exports.deleteCafeItemService = async (cafeId, newData) => {
    const updatedCafe = await Cafe.findByIdAndUpdate(cafeId, newData, { runValidators: true });
    return updatedCafe;
}

// update a cafe
exports.updateCafeItemService = async (data, productIdToUpdate, newPrice, newQuantity) => {
    const updatedCafe = await Cafe.findOneAndUpdate(
        {
            _id: data?.cafeId,
            'item._id': productIdToUpdate,
        },
        {
            $set: {
                'item.$.name': data?.name,
                'item.$.price': newPrice,
                'item.$.quantity': newQuantity,
            },
        },
        { new: true }
    );
    return updatedCafe;
}