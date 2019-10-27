let express = require("express");
let filter = express.Router();
let cors = require("cors");

let db = require("../database/db");


filter.get("/Allfilter",cors(),(req,res,next) => {
   db.ResFilterIcon.findAll()
       .then(Filter => {
           res.status(200).send(Filter);
       })
       .catch(err => {
           res.status(404).send({
               message: "pas de filter trouvais",
               error: err
           })
       })
});



filter.get("/filter/:by",(req,res) => {
    db.ResFilterIcon.findAll({
        attributes:{
            exclude:["FilterName","Status","id","created_at","updated_at","iconId","restaurantId"]
        },
        where: {FilterName: req.params.by},
        include: [{
            model: db.Restaurant,
            where: {Status: false}
        }]
    })
        .then(resto => {
            res.status(200).json(resto)
        })
        .catch(err => {
            res.status(404).send({
                message: "not found",
                erreur: err
            })
        })
});

filter.get("/filter/:Status",(req,res) => {
    db.Restaurant.findAll({
        where: {Status: req.params.by},

    })
        .then(resto => {
            res.status(200).json(resto)
        })
        .catch(err => {
            res.status(404).send({
                message: "not found",
                erreur: err
            })
        })
});


filter.get("/Allfilter/:by",(req,res) => {
    db.ResFilterIcon.findAll({
        attributes:{
          exclude:["FilterName","Status","id","created_at","updated_at","iconId","restaurantId"]
        },
        where: {FilterName: req.params.by},
        include: [{
            model: db.Restaurant,
        }],
        raw: true,

    })
        .then(resto => {
            res.status(200).json(resto)
        })
        .catch(err => {
            res.status(404).send({
                message: "not fond",
                erreur: err
            })
        })
});


module.exports =  filter;
