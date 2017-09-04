const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    rating_product_id: {
        type: String,
        required: true
    },
    star_1: {
        type: Number,
        required: true
    },
    star_2: {
        type: Number,
        required: true
    },
    star_3: {
        type: Number,
        required: true
    },
    star_4: {
        type: Number,
        required: true
    },
    star_5: {
        type: Number,
        required: true
    }
});

const Rating= module.exports = mongoose.model('product_rating', ratingSchema);


module.exports.getRatingByProductID = function(product_id, callback){
    const query = {rating_product_id:product_id};
    Rating.find(query, callback);
}


module.exports.addRating = function(newRating, callback){
    newRating.save(callback);
}