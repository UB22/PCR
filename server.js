const { Console } = require("console");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config.js");
const mongoose = require("mongoose");
const Provider = require("./models/providers.js");
const Review = require("./models/review.js")
var morgan = require("morgan");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("tiny"));

// setup the connection with the database
mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true});

 
app.set("view engine", "ejs");

// Routes

//main page
app.get("/", (req, res) => {
	Provider.find()
	.exec()
	.then((allProviders) => {
		res.render("home.ejs", {providers: allProviders});
	})
	.catch((err) => {
		console.log("Error" + err);
	})
})
 

//filter routes
app.post("/filter", (req, res) => {
	const type = req.body.type;
	const method = req.body.method;
	const price = req.body.price;
	const location = req.body.location;
	if (location != undefined || method != undefined || price != undefined || type != undefined) {
		if (method === undefined && type === undefined && price === undefined) {
			Provider.
			find({ region: location }).
			exec().
			then((providers) => {
				res.render("home.ejs", {providers: providers});
			})
		} else if (method === undefined && price === undefined && location === undefined) {
			console.log("TYPE - single")
			Provider.
			find({
				$or: [
				  { 'type': type },
				  { 'type': "Test to release + fit to fly" }
				]
			  }, function(err, providers) {
				 if(!err) res.render("home.ejs", {providers: providers});
			  });
		} else if (type === undefined && price === undefined && location === undefined) {
			Provider.
			find({
				$or: [
				  { 'method': method },
				  { 'method': "Self-swab + visit test centre" }
				]
			  }, function(err, providers) {
				 if(!err) res.render("home.ejs", {providers: providers});
			  });
		} else if (method === undefined && type === undefined && location === undefined) {
			if (price === "low-to-high") {
				Provider.
				find().
				sort('price').
				exec().
				then((providers) => {
					res.render("home.ejs", {providers: providers});
				})
			} else {
				Provider.
				find().
				sort('-price').
				exec().
				then((providers) => {
					res.render("home.ejs", {providers: providers});
				})
			}
		} else if (method === undefined && price === undefined) {
			Provider.
			find({ region: location, $or: [
				  { 'type': type },
				  { 'type': "Test to release + fit to fly" }
				]
			  }).
			exec().
			then((providers) => {
				res.render("home.ejs", {providers: providers});
			})
		} else if (type === undefined && price === undefined) {
			Provider.
			find({ region: location, $or: [
				  { 'method': method },
				  { 'method': "Self-swab + visit test centre" }
				] }).
			exec().
			then((providers) => {
				res.render("home.ejs", {providers: providers});
			})
		} else if (type === undefined && method === undefined) {
			if (price === "low-to-high") {
				Provider.
				find({ region: location }).
				sort('price').
				exec().
				then((providers) => {
					res.render("home.ejs", {providers: providers});
				})
			} else {
				Provider.
				find({ region: location }).
				sort('-price').
				exec().
				then((providers) => {
					res.render("home.ejs", {providers: providers});
				})
			}
		} else if (location === undefined && method === undefined) {
			if (price === "low-to-high") {
				Provider.
				find({ $or: [
				  { 'type': type },
				  { 'type': "Test to release + fit to fly" }
				]}).
				sort('price').
				exec().
				then((providers) => {
					res.render("home.ejs", {providers: providers});
				})
			} else {
				Provider.
				find({ $or: [
				  { 'type': type },
				  { 'type': "Test to release + fit to fly" }
				] }).
				sort('-price').
				exec().
				then((providers) => {
					res.render("home.ejs", {providers: providers});
				})
			}
		} else if (location === undefined && type === undefined) {
			if (price === "low-to-high") {
				Provider.
				find({ $or: [
				  { 'method': method },
				  { 'method': "Self-swab + visit test centre" }
				] }).
				sort('price').
				exec().
				then((providers) => {
					res.render("home.ejs", {providers: providers});
				})
			} else {
				Provider.
				find({ $or: [
				  { 'method': method },
				  { 'method': "Self-swab + visit test centre" }
				] }).
				sort('-price').
				exec().
				then((providers) => {
					res.render("home.ejs", {providers: providers});
				})
			}
		} else if (price === undefined && location === undefined) {
			Provider.
			find({ $and: [
				  { $or: [{ 'type': type },
				  { 'type': "Test to release + fit to fly" }]},

				  { $or: [
					{ 'method': method },
					{ 'method': "Self-swab + visit test centre" }
				  ] }]
				}).
			exec().
			then((providers) => {
				res.render("home.ejs", {providers: providers});
			})
		} else if (location === undefined) {
			if (price === "low-to-high") {
				Provider.
				find({ $and: [
				  { $or: [{ 'type': type },
				  { 'type': "Test to release + fit to fly" }]},

				  { $or: [
					{ 'method': method },
					{ 'method': "Self-swab + visit test centre" }
				  ] }]
				}).
				sort('price').
				exec().
				then((providers) => {
					res.render("home.ejs", {providers: providers});
				})
			} else {
				Provider.
				find({ $and: [
				  { $or: [{ 'type': type },
				  { 'type': "Test to release + fit to fly" }]},

				  { $or: [
					{ 'method': method },
					{ 'method': "Self-swab + visit test centre" }
				  ] }]
				}).
				sort('-price').
				exec().
				then((providers) => {
					res.render("home.ejs", {providers: providers});
				})
			}
		} else if (method === undefined) {
			if (price === "low-to-high") {
				Provider.
				find({ region: location, $or: [
				  { 'type': type },
				  { 'type': "Test to release + fit to fly" }
				] }).
				sort('price').
				exec().
				then((providers) => {
					res.render("home.ejs", {providers: providers});
				})
			} else {
				Provider.
				find({ region: location, $or: [
				  { 'type': type },
				  { 'type': "Test to release + fit to fly" }
				] }).
				sort('-price').
				exec().
				then((providers) => {
					res.render("home.ejs", {providers: providers});
				})
			}
		} else if (price === undefined) {
			Provider.
			find({ $and: [
				  {region: location},
				  { $or: [{ 'type': type },
				  { 'type': "Test to release + fit to fly" }]},

				  { $or: [
					{ 'method': method },
					{ 'method': "Self-swab + visit test centre" }
				  ] }]
				}).
			exec().
			then((providers) => {
				res.render("home.ejs", {providers: providers});
			})
		} else if (type === undefined) {
			if (price === "low-to-high") {
				Provider.
				find({ region: location, $or: [
				  { 'method': method },
				  { 'method': "Self-swab + visit test centre" }
				] }).
				sort('price').
				exec().
				then((providers) => {
					res.render("home.ejs", {providers: providers});
				})
			} else {
				Provider.
				find({ region: location, $or: [
				  { 'method': method },
				  { 'method': "Self-swab + visit test centre" }
				] }).
				sort('-price').
				exec().
				then((providers) => {
					res.render("home.ejs", {providers: providers});
				})
			}
		} else {
			if (price === "low-to-high") {
				Provider.
				find({ $and: [
				  {region: location},
				  { $or: [{ 'type': type },
				  { 'type': "Test to release + fit to fly" }]},

				  { $or: [
					{ 'method': method },
					{ 'method': "Self-swab + visit test centre" }
				  ] }]
				}).
				sort('price').
				exec().
				then((providers) => {
					res.render("home.ejs", {providers: providers});
				})
			} else {
				Provider.
				find({ $and: [
				  {region: location},
				  { $or: [{ 'type': type },
				  { 'type': "Test to release + fit to fly" }]},

				  { $or: [
					{ 'method': method },
					{ 'method': "Self-swab + visit test centre" }
				  ] }]
				}).
				sort('-price').
				exec().
				then((providers) => {
					res.render("home.ejs", {providers: providers});
				})
			}
		}
	} else {
		Provider.
		find()
		.exec()
		.then((allProviders) => {
			res.render("home.ejs", {providers: allProviders});
		})
		.catch((err) => {
			console.log("Error" + err);
		})
	}
})


//provider page
app.get("/providers/:id", (req, res) => {
    const providerId = req.params.id;
	if (providerId.match(/^[0-9a-fA-F]{24}$/)) {
		Provider.findById(providerId)
		.exec()
		.then((provider_info) => {
			Review.find({"providerId": providerId}, (err, reviews) => {
			if (err) {
				res.send(err);
			} else {
				res.render("provider.ejs", {provider: provider_info, reviews: reviews})
			}
		})
		})
		.catch((err) => {
			console.log("Error:" + err);
		});
		
	}
})

//for adding comments
app.post("/providers/:id/comments/add", (req, res) => {
	Review.create({
		name: req.body.firstname,
		headline: req.body.headline,
		text: req.body.review_description,
		stars: req.body.stars,
		providerId: req.params.id
	})
	.then((newReview) => {
		res.redirect(`/providers/${req.params.id}`);
	})
	.catch((err) => {
		console.log(err);
		res.redirect(`/providers/${req.params.id}`);
	})
})


app.get("/providers/:id/comments/add", (req, res) => {
	res.redirect(`/providers/${req.params.id}`);
})

//  about us page
app.get("/about", (req, res) => {
    res.render("about.ejs");
})

// contact us page
app.get("/contact", (req, res) => {
    res.render("contact.ejs");
})

app.post("/contact/submitted", (req, res) => {
// 	get the data from the form
// 	email the data to me
	console.log(req.body.firstname, req.body.surname, req.body.email, req.body.message);
	res.render("submitted.ejs");
})


app.listen(3000, () => {
    console.log("app is running")
})