const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require('fs');

const app = express();

const port = 3300;

var makeMeme;
var lastName;
var resFile;

var upload = multer({ dest: '/Images' });

function loadMeme(response) {
	resFile = makeMeme("Images/" + lastName, "Your face when", "you working with js");
	// response.end(resFile);
	var extension = resFile.split(".").pop();
	var contentType = "text/html";
	switch (extension) {
        case 'png':
        	contentType = 'image/png';
        	break;      
    	case 'jpg':
        	contentType = 'image/jpg';
        	break;
	}

	fs.readFile(resFile, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end(error.code + "..\n");
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.render('image', {
      			path: resFile
      		});
      		response.end()
            // response.end(content, 'binary');
        }
    });
    return response
};

fs.readFile('process_image.rb', 'utf8', function(err, contents) {
	var rubyMemeGen = contents;
    Interop.eval("application/x-ruby", rubyMemeGen);
	makeMeme = Interop.import("generateMeme");
	console.log("Ruby code is loaded!");
});

app.use(bodyParser.json());

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
    	lastName = file.fieldname + "_" + Date.now() + "_" + file.originalname;
        callback(null, lastName);
    }
});

var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count 

app.get("/", function (req, res) { 
    res.sendFile(__dirname + "/index.html"); 
}); 
  
app.post("/api/Upload", upload.single("file"), function (req, res) { 
    upload(req, res, function (err) { 
        if (err) { 
            return res.end("Something went wrong!"); 
        } 
        // return res.end("File successfully uploaded!"); 
        return loadMeme(res);
    }); 
}); 

app.listen(3300, function (a) { 
    console.log("Listening to port 3300"); 
}); 