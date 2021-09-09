const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
	name: String,
	headline: String,
	text: String,
	stars: Number,
	providerId: mongoose.Schema.Types.ObjectId
});

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;