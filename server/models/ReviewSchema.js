// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    idNumber: { type: String, required: true },
    review: { type: String, required: true },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
