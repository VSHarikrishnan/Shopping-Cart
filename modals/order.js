var mongoose = require("mongoose");
var orderschema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    address: String,
    cart: { type: Object }


}, {
    timestamps: true
});
module.exports = mongoose.model("order", orderschema);