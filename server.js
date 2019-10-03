var express = require("express")
var bodyParser =  require("body-parser")

// require routes
var users = require("./routes/user")


var cors = require("cors")

var port = 3000

var app =  express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


// diefind prifix for route
app.use("/api",users)


app.listen(port, function () {
    console.log("server start on " + port)
})
