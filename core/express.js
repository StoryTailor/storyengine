const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

let App = express();

App.use(bodyParser.json());
App.use(cors());

module.exports = App;