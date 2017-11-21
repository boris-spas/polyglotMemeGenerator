const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require('fs');

const app = express();

const port = 3300;

var makeMeme;
var lastName;
var resFile;

// function loadMeme(response) {
// 	resFile = makeMeme("./Images/" + lastName, "Your face when", "you are working with js");
// 	// response.writeHeader("200")
// 	response.sendFile(__dirname + "/" + resFile);
// 	response.end()
//     return response
// };

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
    res.sendFile(__dirname + "/index.html"); 
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