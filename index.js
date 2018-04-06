const path = require("path");
const App = require(path.join(__dirname, "src/core/express.js"));
const config = require(path.join(__dirname, "config/global.json"));

App.runServer(config);
console.log(`Running on port ${config.port}`);