let express = require("express");
let routesub = express.Router();

let db = require("../database/db");


routesub.get("/getAllSubCategorie", (req, res) => {

    db.Subcategory.findAll()
        .then(AllSubCat => {
            res.status(200).json(AllSubCat)
        })
        .catch(err => {
            res.status(400).json(err)
        })
});

routesub.post("/newSubCategorie", (req, res) => {

    db.Subcategory.create(req.body)
        .then(NewSubCat => {
            res.status(200).json(NewSubCat)
        })
        .catch(err => {
            res.status(400).json(err)
        })
});

routesub.put("/updateSubCategorie", (req, res) => {

    db.Subcategory.update(req.body)
        .then(updatesub => {
            res.status(200).json(updatesub)
        })
        .catch(err => {
            res.status(400).json(err)
        })
});

routesub.get("/FindOneSubCategotie/:name", (req, res) => {
    db.Subcategory.findOne({
        where: {name: req.params.name}
    })
        .then(OneSubCate => {
            res.status(200).json(OneSubCate)
        })
        .catch(err => {
            res.status(404).json("Not found")
        })
});


module.exports = routesub;







