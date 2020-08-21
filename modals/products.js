var mongoose = require('mongoose');

var productschema = new mongoose.Schema({
    imgpath: String,
    tittle: String,
    description: String,
    price: Number
});

module.exports = mongoose.model("products", productschema)