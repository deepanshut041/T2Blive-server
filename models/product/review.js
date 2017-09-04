const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    review_product_id : {
        type: String,
        required: true
    },
    review_author: {
        type: String,
        required: true
    },
    review_author_id: {
        type: String,
        required: true
    },
    review_date: {
        type: String,
        required: true
    },
    review_content: {
        type: String,
        required: true
    }
});

const Reviews = module.exports = mongoose.model('product_review', reviewSchema);


module.exports.getReviewByProductID = function(product_id, callback){
    const query = {review_product_id:product_id};
    Reviews.find(query, callback);
}


module.exports.addReview = function(newReview, callback){
    newReview.save(callback);
}