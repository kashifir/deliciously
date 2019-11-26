var express = require("express");
var badges = express.Router();

let db = require("../database/db");


badges.get("/Allbadges",(req,res) => {
    db.BadgeCountry.findAll()
        .then(BadgeCountry => {
            res.json(BadgeCountry)
        })
        .catch(err => {
            res.json(err);
        })
});

module.exports = badges;