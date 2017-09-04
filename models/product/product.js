const mongoose = require('mongoose');
const highSchema = mongoose.Schema({
    key:{
        type:String
    },
    value:{
        type:String
    }
});

const specSchema = mongoose.Schema({
    heading:{
        type:String
    },
    value:[
        {
            key:String,
            value:String
        }
    ]
});


const productSchema = mongoose.Schema({
    product_category : {
        type: String,
        required: true
    },
    product_subCategory: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_quantity: {
        type: Number,
        required: true
    },
    product_sPrice: {
        type: Number,
        required: true
    },
    product_cPrice: {
        type: Number,
        required: true
    },
    product_img:[String],
    product_high:[highSchema],
    product_spec:[specSchema]
});


const Product = module.exports = mongoose.model('product', productSchema);

//Create 
module.exports.addProduct = function(newProduct, callback){
    newProduct.save(callback);
}

//Update
module.exports.updateProduct = function(id,product, callback){
    Product.findByIdAndUpdate(id, product, callback);
}
module.exports.updateProductAttribute = function(id, product, callback){
    Product.findByIdAndUpdate(id, product, callback);
}
//Read
module.exports.getProducts = function (callback) {
    Product.find({},callback);
}

module.exports.getProductById = function (id, callback) {
    Product.findById(id, callback);
}

module.exports.getProductByCategory = function(product_category, product_subCategory, callback){
    const query = {$and:[{product_subCategory:product_subCategory},
        {product_category:product_category}]};
    Product.find(query, callback);
}


//Delete
module.exports.deleteProduct = function(id, callback){
    Product.findByIdAndRemove(id,callback);
}

