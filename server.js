////////////////////////////////////////////////////////////////////////
//                             LOAD RUBY                              //
////////////////////////////////////////////////////////////////////////
const fs = require('fs');

var makeMeme;

fs.readFile('process_image.rb', 'utf8', function(err, contents) {
	var rubyMemeGen = contents;
    Interop.eval("application/x-ruby", rubyMemeGen);
	makeMeme = Interop.import("generateMeme");
	console.log("Ruby code is loaded!");
});

var lastName;
var resFile;

////////////////////////////////////////////////////////////////////////
//                             LOAD JAVA                              //
////////////////////////////////////////////////////////////////////////
var dbm = Java.type('DBManager').getInstance();

////////////////////////////////////////////////////////////////////////
//                               JS APP                               //
////////////////////////////////////////////////////////////////////////
const express = require("express");
const port = 3300;
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());


app.get("/", function (req, res) {

	// for (var i of dbm.testByteArray("hohoho")) {
	// 	console.log(i);
	// }
	// var imagesHashMap = dbm.getNImages(3);
	// console.log("From DB:" + imagesHashMap);
    res.sendFile(__dirname + "/index.html");
});

app.get("/binimg", function(req, res) {
	var imagesHashMap = dbm.getNImages(3);
	// console.log("From DB:" + imagesHashMap);
	res.writeHead(200, {'Content-Type': 'text/plain'});
});

////////////////////////////////////////////////////////////////////////
//                            FILE UPLOAD                             //
////////////////////////////////////////////////////////////////////////
const multer = require("multer");

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images/");
    },
    filename: function (req, file, callback) {
    	lastName = file.fieldname + "_" + Date.now() + "_" + file.originalname;
        callback(null, lastName);
    }
});

var upload = multer({ dest: 'Images/', storage: Storage });

app.post("/api/Upload", upload.single("imgUploader"), function (req, res) {
	topCaption = req.body["topCaption"];
    botCaption = req.body["botCaption"];
    resFile = makeMeme("./Images/" + lastName, topCaption, botCaption);
    res.sendFile(__dirname + "/" + resFile);
});


////////////////////////////////////////////////////////////////////////
//                             LAUNCH APP                             //
////////////////////////////////////////////////////////////////////////
app.listen(3300, function (a) {
	console.log("Listening to port 3300");
});
