var express = require("express");
var router = express.Router();

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var db = require("../database/db")


process.env.SECRET_KEY = 'secret';

//resgister new user

router.post("/register", (req, res) => {
    var userDate = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: req.body.password
    };
    // find is user exist or not
    db.user.findOne({
        where: {email: req.body.email}
    })
    // if not exists so  then do that
        .then(user => {
            if (!user) {
                // make hash of password in bcrypt, salt 10
                const hash = bcrypt.hashSync(userDate.password, 10);
                userDate.password = hash;
                db.user.create(userDate)
                    .then(user => {
                        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        })
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
        include: [{
            model: db.comannde,
            attributes: {
                include: [],
                exclude: ['tbl_user_id','id']
            },
            include:[{
                model: db.produte,
                attributes: {
                    include: [],
                    exclude: ['id','more',"commandeshasprodute"]
                },
            }],
        }]
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
        where: {email: req.body.email},
    })
        .then(user =>{
            if (bcrypt.compareSync(req.body.password, user.password)){
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,{
                    expiresIn: 1440
                })
                res.json({token: token})
            }else {
                res.send('your email or your password is not correte')
            }
        }).catch(err => {
        res.send('error '+ err)
    })
})

router.get("/profile", (req, res) => {
    var decoded = jwt.verify(req.header['authorization'],process.env.SECRET_KEY)

    db.user.findOne({
        where: {
            id: decoded.id
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


