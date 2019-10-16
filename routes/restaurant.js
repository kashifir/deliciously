let express = require("express");
let resto = express.Router();

let db = require("../database/db");
    resto.get("/getAllRestaurant", (req,res) =>{
        db.Restaurant.findAll()
            .then(restaurant => {
                res.status(200).send(restaurant)
            })
            .catch(err => {
                res.status(400).send(err);
            })
    });

    resto.get("/getRestaurantByCountry/:id", (req,res) => {
        db.Restaurant.findAll({
            where:{countryId: req.params.id}
        })
            .then(rep => {
                res.status(200).send(rep);
            })
            .catch(err =>{
                res.status(400).send(err);
            })
    });

    resto.get("/getRestaurantByCity/:city", (req,res) => {
        db.Restaurant.findAll({
            where:{city: req.params.city}
        })
            .then(rep => {
                res.status(200).send(rep);
            })
            .catch(err =>{
                res.status(400).send(err);
            })
    });

    resto.get("/getRestaurantByCodePostal/:cp", (req,res) => {
        db.Restaurant.findAll({
            where:{RPostalCode: req.params.cp}
        })
            .then(rep => {
                res.status(200).send(rep);
            })
            .catch(err =>{
                res.status(400).send(err);
            })
    });

    resto.post("/AddNewRestaurant", (req,res) => {
        db.Restaurant.findOne({
            where:{RName: req.body.RName}
        })
            .then(Restaurant => {
                if(!Restaurant) {
                    db.Restaurant.create(req.body)
                        .then(reponse => {
                            res.status(200).send(reponse);
                        })
                        .catch(err => {
                            res.status(400).send(err);
                        })
                }
                else{
                    res.status(400).send("le Restaurant exite déja");
                }
            })
    });



 module.exports =   resto;
