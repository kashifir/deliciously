let express = require("express");
let resto = express.Router();
let csv = require("csv");

let db = require("../database/db");
    resto.get("/getAllRestaurant", (req,res) =>{
        db.Restaurant.findAll({
            attributes: {
                exclude: ["rescategoryId","countryId"]
            },
            include:[{
                model:db.ResCategory
            },
                {
                    model: db.Country
                }]
        })
            .then(restaurant => {
              res.status(200).json( restaurant);
            })
            .catch(err => {
                res.send(err);
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
        db.Restaurant.findOne({
            where:{id: req.params.id},
            attributes: {
                include: [],
                // don't need to show this filed
                exclude: ["updated_at", "created_at"]
            },
        })
            .then(rep => {
                res.status(200).send(rep);
            })
            .catch(err =>{
                res.status(400).send(err);
            })
    });



 resto.get("/RestaurantByStauts/:RestaurantByStauts", (req,res) => {
        db.Restaurant.findOne({
            where:{id: req.params.id},
            attributes: {
                include: [],
                // don't need to show this filed
                exclude: ["updated_at", "created_at"]
            },
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
            where:{userId : req.params.id},

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
    } );

resto.get("/csv", (req,res) => {
    function MyCSV(a,z,e,r,t,y,u,i,o,p,q,s, d, f) {
        this.RName= a,
            this.RDescription =z,
            this.RStreetNum =e,
            this.RStreet=r,
            this.RCity=t,
            this.RPostalCode=y,
            this.countryId=u,
            this.RMetro=i,
            this.RContact=o,
            this.RPriceDes=p,
            this.RLatitude=q,
            this.RLongitude=s,
            this.MapIcon=d,
            this.PlaceId=f
    }
    const obj = csv();

    var MyData = [];
// MyData array will contain the data from the CSV file and it will be sent to the clients request over HTTP.
    obj.from.path('/Users/kashif/Downloads/TOTALE CURATION - Restaurants  - TOTALE CURATION - Restaurants .csv').to.array(function (data) {
        for (var index = 0; index < data.length; index++) {
            MyData.push(new MyCSV(data[index][0], data[index][1], data[index][2], data[index][3], data[index][4], data[index][5], data[index][6], data[index][7], data[index][8], data[index][9], data[index][10], data[index][11], data[index][12], data[index][13], data[index][14]));
        }
        console.log(MyData);
       for (let i = 0; i < MyData.length ; i++) {
            db.Restaurant.create(MyData[i])
               .then(resto => {
                    res.json(resto)
                })
                .catch(err => {
                   res.json(err)
                })
        }
    });




})








 module.exports =   resto;
