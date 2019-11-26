var express = require("express");
var router = express.Router();

var db = require("../database/db");


router.post("/add", (req, res) => {

    for (let i = 0; i < req.body.length; i++) {
        db.Country.create(req.body[i])
            .then(resp => {
                res.json(resp);
            })
            .catch(err => {
                res.json(err);
            })
    }

});

router.get("/All", (req, res) => {
    db.Country.findAll()
        .then(Country => {
            res.json(Country)
        })
        .catch(err => {
            res.status(404).json({error: " " + err})
        })
});

module.exports = router;
