const path = require("path");
const express = require(path.join(__dirname, "core/express.js"));
const http = require("http");
const server = http.createServer(express);

server.listen(27000);