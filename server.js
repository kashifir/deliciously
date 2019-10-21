let express = require("express");
let bodyParser =  require("body-parser");
let session = require("express-session");
let passport = require('passport');

// require routes
let user = require("./routes/user")(passport);
let filter = require("./routes/Filter");
let restaurant = require("./routes/restaurant");
let Subcate = require("./routes/subcategorie");



let cors = require("cors");



let port = 3000;

let app =  express();

app.use(cors());



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

// diefind prifix for route
app.use("/api",user);
app.use("/Restaurant",restaurant);
app.use("/api",filter);
app.use("/api",Subcate);


app.listen(port, function () {
    console.log("server start on " + port)
})
