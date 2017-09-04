const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    product_id:{
        type:String,
        required: true
    },
    quantity:{
        type:Number,
        required: true
    },
    product_price:{
        type:Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
});

const productSchema = mongoose.Schema({
    
});


const Cart = module.exports = mongoose.model('cart', postSchema);

//Create 
module.exports.addCart = function(newCart, callback){
    newCart.save(callback);
}

//Update
module.exports.updateCart = function(id,cart, callback){
    Cart.findByIdAndUpdate(id, cart, callback);
}

//Read
module.exports.getCarts = function (user_id, callback) {
    Cart.find({user_id:user_id},callback);
}

module.exports.getCartById = function (id, callback) {
    Cart.findById(id, callback);
}


//Delete
module.exports.deleteCart = function(id, callback){
    Cart.findByIdAndRemove(id,callback);
}

