var express = require("express");
var router = express.Router();

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var db = require("../database/db")


process.env.SECRET_KEY = 'secret';

//resgister new user

router.post("/signup", (req, res) => {
    console.log(req.body);

    var userDate = {
        UEmail: req.body.uEmail,
        UPassword: req.body.uPassword
    };
    // find is user exist or not
    db.user.findOne({
        where: {UEmail: req.body.UEmail}
    })
    // if not exists so  then do that
        .then(user => {
            if (!user) {
                // make hash of password in bcrypt, salt 10
                const hash = bcrypt.hashSync(req.body.uPassword, 10);
                userDate.UPassword = hash;
                db.user.create(userDate)
                    .then(user => {
                        res.json({user: user})
                    })
                    .catch(err => {
                        res.send("error" + err)
                    })
            }
            // show error message user exists
            else {
                res.json({
                    error: "user alredy exists"
                })
            }
        })
});

// get All users
router.get("/user", (req, res) => {
    db.user.findAll({
        // mask password
        attributes: {
            include: [],
            exclude: ['password']
        },

    })
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.send("error" + err)
        })
})

// login

router.post("/login", (req, res) => {

    db.user.findOne({
        where: {UEmail: req.body.uemail},
    })
        .then(user =>{
            if (bcrypt.compareSync(req.body.upassword, user.upassword)){
                res.json(user)
            }else {
                res.send('email ou le mot de passe ')
            }
        }).catch(err => {
        res.send('error '+ err)
    })
})

router.get("/profile", (req, res) => {
    db.user.findOne({
        where: {
            token: req.body.token
        }
    })
        .then(user => {
            if(user){
                res.json(user)
            }else {
                res.send("user not existe")
            }
        })
        .catch(err => {
            res.send('error ' + err)
        })
})

module.exports = router;


