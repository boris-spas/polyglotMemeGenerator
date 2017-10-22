const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();

const port = 3300;

app.use(bodyParser.json());

app.listen(port, function (argument) {
	console.log("Hey! Port " + port);
});