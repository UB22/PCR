const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
	name: String,
	region: String,
	email: String,
	telephone: String,
	website: String,
	price: Number,
	type: String,
	time: String,
	method: String
});

const Provider = mongoose.model("Provider", providerSchema);

module.exports = Provider;