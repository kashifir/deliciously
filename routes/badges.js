var express = require("express");
var badges = express.Router();

let db = require("../database/db");


badges.get("/countrybagde",(req,res) => {
    db.BadgeCountry.findAll()
        .then(BadgeCountry => {
            res.json(BadgeCountry)
        })
        .catch(err => {
            res.json(err);
        })
});
badges.get("/AllBadge",(req,res) => {
    db.Badge.findAll()
        .then(Badge => {
            res.json(Badge)
        })
        .catch(err => {
            res.json(err);
        })
});

module.exports = badges;