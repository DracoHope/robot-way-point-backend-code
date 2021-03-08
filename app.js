const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));

app.use(express.static("public"));

app.set('view engine', 'ejs');

// **********************************************************************************************************
app.get("/", function(req, res){
    console.log("****************** In the Root Index route ******************")
    res.sendFile(__dirname + "/index.html");
});

// **********************************************************************************************************

// GET Request for a "about" route
app.get("/robotV2", function(req, res){
    console.log("****************** In the robotV2 route ******************");
    res.sendFile(__dirname + "/index2.html");
});

// **********************************************************************************************************

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log(`The Server is Running at Port ${port}`);
});
