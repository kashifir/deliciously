var express = require("express");
var router = express.Router();

var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var db = require("../database/db");

var FacebookStrategy = require('passport-facebook').Strategy;
var confiAuth = require("../config/auth");


process.env.SECRET_KEY = 'secret';

//resgister new user
module.exports = function (passport) {

    router.post("/signup", (req, res) => {
        // find is user exist or not
        db.user.findOne({
            where: {UEmail: req.body.uEmail}
        })
        // if not exists so  then do that
            .then(user => {
                if (!user) {
                    // make hash of password in bcrypt, salt 10
                    const hash = bcrypt.hashSync(req.body.uPassword, 10);
                    password = hash;
                    db.user.create({
                        UEmail: req.body.uEmail,
                        UPassword: password
                    })
                        .then(user => {
                            res.status(200).json({user: user})
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

    router.get("/profile/:id", (req, res) => {
        db.user.findOne({
            where: {id: req.params.id}
        })
            .then(user => {
                if (user) {
                    res.send(user);
                } else {
                    res.send({error: 'error'})
                }
            }).catch(err => {
            res.send(err);
        })

    });

    router.put("/update/:id", (req, res) => {
        db.user.update(req.body, {
                where: {id: req.params.id}
            }
        )
            .then(user => {
                res.status(200).json({user:user});
            })
            .catch(err => {
                res.status(400).json(err);
            })
    });

// login

    router.post("/login", (req, res) => {
        console.log(req.body);
        db.user.findOne({
            where: {UEmail: req.body.uEmail}
        })
            .then(user => {
                if (user) {
                    console.log(user);

                    if (bcrypt.compareSync(req.body.uPassword, user.UPassword)) {
                        res.status(200).json({"user":{
                                id:user.id,
                                uEmail:user.uEmail,
                                uName:user.UName,
                                uFirstName: user.UFirstName,
                                uLastName: user.ULastName,
                            }})
                    } else {
                        res.status(404).json({error: 'error mail or error password'})
                    }
                } else {
                    return res.status(400).send({
                        error: 'user not fond'
                    });
                }
            })
            .catch(err => {
                res.send('error' + err)
            })
    });

    router.post("/loginsite", (req, res) => {
        console.log(req.body);
        db.user.findOne({
            where: {UEmail: req.body.email}
        })
            .then(user => {
                if (user) {
                    console.log(bcrypt.compareSync(req.body.password, user.UPassword));
                    if (bcrypt.compareSync(req.body.password, user.UPassword)) {
                        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        });
                        res.status(200).json({token: token})
                    } else {
                        res.status(520).json('error mail or error password')
                    }
                } else {
                    return res.status(404).send({
                        error: 'user not fond'
                    });
                }
            })
            .catch(err => {
                res.send('error' + err)
            })
    });


// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
    router.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.

    router.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/api/user',
            failureRedirect: '/api/login',
        }));

    passport.use(new FacebookStrategy({
            // id de l'app facebook
            clientID: confiAuth.facebookAuth.clientID,
            // cle secret de l'app facebook
            clientSecret: confiAuth.facebookAuth.clientSecret,
            // perment de fait la redirection si la conn a éte
            // fait dans cas envoi sur la page /
            // sinon sur la page d'accueil
            callbackURL: confiAuth.facebookAuth.callbackURL,
            enableProof: true,
            // les information que on récuperer via facebook pour les
            //  user
            profileFields: ['id', 'displayName', 'emails', 'photos']
        },
        function (accessToken, refreshToken, profile, done) {
            // perment de fait un callback
            process.nextTick(function () {
                // recherche un client via l'id de sont facebook
                db.user.findOne({
                    where: {'FBId': profile.id}
                })
                    .then(user => {
                        // si le client exits
                        if (user) {
                            // return client
                            done(user)
                            // sinon  on client créer le client
                        } else {
                            db.user.create({
                                'FBId': profile.id,
                                'UFacebook': profile.displayName,
                                'UFirstName': profile.name.givenName,
                                'ULastName': profile.name.familyName,
                                'UEmail': profile.email,
                                'FBImageURL': profile.photos[0].value
                            })
                                .then(newuser => {
                                    // return nouveaux client
                                    done(newuser);
                                })
                                .catch(err => {
                                    // return error
                                    done(err);
                                })
                        }
                    })
                    .catch(err => {
                        // si error alors return error
                        if (err) {
                            done(err)
                        }
                    })
            })
        }
    ));


    router.post("/addVisitedContry", (req, res) => {
        db.VisitedCountry.create(req.body)
            .then(newVisited => {
                res.status(200).json(newVisited)
            })
            .catch(err => {
                res.status(400).json("Bad data")
            })
    });

    router.post("/addVisitedRestaurant", (req, res) => {
        db.VisitedRestaurant.create(res.body)
            .then(Visited => {
                res.status(200).json(Visited)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    });

    router.post("/addFavouriteRestaurant", (req, res) => {
        db.Favourite.create(req.body)
            .then(Favourite => {
                res.status(200).json(Favourite)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    });


    return router;

};


