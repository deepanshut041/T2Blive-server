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

const inventorySchema = mongoose.Schema({
    products : [productSchema],
    inventory_date: {
        type: String,
        required: true
    },
    inventory_total: {
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
    },
    status:{
        type:String,
        require: true
    }
});



const Inventory = module.exports = mongoose.model('inventorys', inventorySchema);

//Create 
module.exports.addInventory = function(newInventory, callback){
    newInventory.save(callback);
}

//Update
module.exports.updateInventory = function(id,inventory, callback){
    Inventory.findByIdAndUpdate(id, inventory, callback);
}

//Read
module.exports.getInventorys = function (callback) {
    Inventory.find({},callback);
}

module.exports.getInventoryById = function (id, callback) {
    Inventory.findById(id, callback);
}


//Delete
module.exports.deleteInventory = function(id, callback){
    Inventory.findByIdAndRemove(id,callback);
}

