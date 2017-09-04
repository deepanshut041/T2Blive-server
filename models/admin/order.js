const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
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
    }
});

const orderSchema = mongoose.Schema({
    products : [productSchema],
    order_date: {
        type: String,
        required: true
    },
    order_total: {
        type: String,
        required: true
    },
    ship_date: {
        type: String,
        required: true
    },
    ship_address: {
        type: String,
        required: true
    },
    ship_pin: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    payment_id: {
        type: String,
        required: true
    }
});



const Order = module.exports = mongoose.model('orders', orderSchema);

//Create 
module.exports.addOrder = function(newOrder, callback){
    newOrder.save(callback);
}

//Update
module.exports.updateOrder = function(id,order, callback){
    Order.findByIdAndUpdate(id, order, callback);
}

//Read
module.exports.getOrders = function (callback) {
    Order.find({},callback);
}

module.exports.getOrderById = function (id, callback) {
    Order.findById(id, callback);
}


//Delete
module.exports.deleteOrder = function(id, callback){
    Order.findByIdAndRemove(id,callback);
}

