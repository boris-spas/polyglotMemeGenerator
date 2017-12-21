const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require('fs');

const app = express();

const port = 3300;

// Ruby image processing
var makeMeme;
var lastName;
var resFile;
// Java DBManager
var dbm = Java.type('DBManager').getInstance();

fs.readFile('process_image.rb', 'utf8', function(err, contents) {
	var rubyMemeGen = contents;
    Interop.eval("application/x-ruby", rubyMemeGen);
	makeMeme = Interop.import("generateMeme");
	console.log("Ruby code is loaded!");
});

app.use(bodyParser.json());

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images/");
    },
    filename: function (req, file, callback) {
    	lastName = file.fieldname + "_" + Date.now() + "_" + file.originalname;
        callback(null, lastName);
    }
});

var upload = multer({
	dest: 'Images/',
	storage: Storage
});


app.get("/", function (req, res) {

	for (var i of dbm.testByteArray("hohoho")) {
		console.log(i);
	}
	// var imagesHashMap = dbm.getNImages(3);
	// console.log("From DB:" + imagesHashMap);
    res.sendFile(__dirname + "/index.html");
});

app.get("/binimg", function(req, res) {
	var imagesHashMap = dbm.getNImages(3);
	// console.log("From DB:" + imagesHashMap);
	res.writeHead(200, {'Content-Type': 'text/plain'});
});

app.post("/api/Upload", upload.single("imgUploader"), function (req, res) {
	topCaption = req.body["topCaption"];
    botCaption = req.body["botCaption"];
    resFile = makeMeme("./Images/" + lastName, topCaption, botCaption);
    res.sendFile(__dirname + "/" + resFile);
});

app.listen(3300, function (a) {
	console.log("Listening to port 3300");
});
