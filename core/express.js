const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

let App = express();

App.use(bodyParser.json());
App.use(cors());

App.get("/", (req, res) => {
	res.json({
		data: {
			title: "Story Engine",
			description: "A Node.js based engine to create non-linear stories",
			author: "Nythe",
			license: "MIT",
			readme: "https://github.com/StoryTailor/storyengine#readme"
		}
	});
});

module.exports = App;