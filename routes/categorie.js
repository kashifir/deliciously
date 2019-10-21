let express = require("express");
let categorie = express();

let db = require("../database/db");
let ResCategory = db.ResCategory;

categorie.get("/AllCategorie",(req,res) => {
    ResCategory.findAll()
        .then(resto => {
            res.status(200).send(resto)
        })
        .catch(err => {
            res.status(404).send(
                err
            )
        });
});

categorie.put("/updateBy/:id",(req,res) => {
    ResCategory.findOne({
        where: {id: req.params.id}
    })
        .then(Onecategorie => {
            if(Onecategorie){
                Onecategorie.update(res.body)
                    .then(Upadtecat => {
                        res.status(200).send(Upadtecat);
                    })
                    .catch(err => {
                        res.status(403).send("mis a jour ne peut pas etre fait" + err)
                    })
            }
            else {
                res.status(404).send("Not Fond");
            }
        })
});

categorie.post("/newCategorie",(req,res) => {
    ResCategory.create(res.body)
        .then(newcate =>(
            res.status(200).send(newcate)
        ))
        .catch(err => {
            res.status(400).json("bad data")
        })
});

module.exports = categorie;
