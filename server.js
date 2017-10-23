const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();

const port = 3300;

app.use(bodyParser.json());

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count 

app.get("/", function (req, res) { 
    res.sendFile(__dirname + "/index.html"); 
}); 
  
app.post("/api/Upload", function (req, res) { 
    upload(req, res, function (err) { 
        if (err) { 
            return res.end("Something went wrong!"); 
        } 
        return res.end("File successfully uploaded!"); 
    }); 
}); 

app.listen(3300, function (a) { 
    console.log("Listening to port 3300"); 
}); 