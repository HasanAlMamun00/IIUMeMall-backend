
const mongoose = require("mongoose");

const uri = `mongodb+srv://llumemall:zNTah1Uodxc4utbC@atlascluster.t9fncjx.mongodb.net/llumemall?retryWrites=true&w=majority`;

function connectDB() {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(uri)
    .then(() => {
        console.log(`Database connection Successfull`);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connectDB;
