const mongoose = require('mongoose');

const bcategoriesSchema = mongoose.Schema({
    category_name : {
        type: String,
        required: true
    },
    category_count: {
        type: Number,
        required: true
    }
});

const BCategory = module.exports = mongoose.model('bCategories', bcategoriesSchema);

//Create 
module.exports.addCategory = function(newCategory, callback){
    newCategory.save(callback);
}


module.exports.updateCategoryCounter = function(id,newCategory, callback){
    BCategory.findByIdAndUpdate(id, newCategory, callback);
}

//Read
module.exports.getCategories = function (callback) {
    BCategory.find({},callback);
}


//Delete
module.exports.deleteCategories = function(id, callback){
    BCategory.findByIdAndRemove(id,callback);
}

