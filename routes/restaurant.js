let express = require("express");
let resto = express.Router();

let db = require("../database/db");
    resto.get("/getAllRestaurant", (req,res) =>{
        db.Restaurant.findAll()
            .then(restaurant => {
              res.status(200).json({restaurant: restaurant});
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

    resto.get("/RestaurantById/:id", (req,res) => {
        console.log(req.params.id);
        db.Restaurant.findOne({
            where:{id: req.params.id}
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

    resto.post("/AddNewComment", (req,res) => {
        db.ResComment.create(req.body)
            .then(reponse => {
                res.status(200).Send({
                    message: "comment bien ajouter",
                    comment: reponse.data
                })
            })
            .catch(err => {
                res.status(400).send({
                    message: "error comment ne peu pas etre ajouter :(",
                    error: err
                })
            })
    });

    resto.get("/getRestaurantFavourit/:id",(req,res) =>{
        db.Favourite.findAll({
            where:{userId : req.params.id}
        })
            .then(restorep =>{
                res.status(200).send(restorep)
            })
            .catch(err => {
                res.status(404).send({
                    message: "vous n'avais pas de liste de favourit restaurant",
                    Erreur: err
                })
            })
    });

    resto.post("/AddNewRestBadge", (req,res)=> {
        db.ResBadge.create(req.body)
            .then(restorep => {
                res.status(200).send(restorep)
            })
            .catch(err => {
                res.status(400).send(err)
            })
    });

    resto.post("/AddNewRestaurantFavourit", (req,res) => {
        db.Favourite.create(req.body)
            .then(favourite => {
                res.status(200).send(favourite);
            })
            .catch(err => {
                res.status(400).send(err);
            })
    } )




 module.exports =   resto;
