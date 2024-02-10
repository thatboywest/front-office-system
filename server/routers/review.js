const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const Review = require("../models/ReviewSchema");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Route to get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to create a new review
router.post('/', async (req, res) => {
    const { idNumber, review } = req.body;

    try {
        const newReview = new Review({ idNumber, review });
        const savedReview = await newReview.save();

        res.status(201).json(savedReview);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router;