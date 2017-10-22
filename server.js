const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const port = 3300;

app.listen(port, function (argument) {
	console.log("Hey! Port " + port);
});