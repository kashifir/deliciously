var express = require("express");
var bodyParser =  require("body-parser");
var session = require("express-session");
var passport = require('passport');

// require routes
var Ruser = require("./routes/user")(passport);



var cors = require("cors");



var port = 3000;

var app =  express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

// diefind prifix for route
app.use("/api",Ruser);
app.use("/api",require('./routes/restaurant'));


app.listen(port, function () {
    console.log("server start on " + port)
})
