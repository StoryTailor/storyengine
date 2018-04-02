const path = require("path");
const express = require(path.join(__dirname, "core/express.js"));
const http = require("http");
const server = http.createServer(express);
const port = 27000;

server.listen(port);
console.log(`Running on port ${port}`);