var express = require("express");
var router = express.Router();

var bcrypt = require("bcrypt");
var db = require("../database/db");
var FacebookStrategy = require('passport-facebook').Strategy;
var confiAuth = require("../config/auth");


process.env.SECRET_KEY = 'secret';

//resgister new user
module.exports = function(passport) {

    router.post("/signup", (req, res) => {
        console.log(req.body);

        var userDate = {
            UEmail: req.body.uEmail,
            UPassword: req.body.uPassword
        };
        // find is user exist or not
        db.user.findOne({
            where: {UEmail: req.body.uEmail}
        })
        // if not exists so  then do that
            .then(user => {
                if (!user) {
                    // make hash of password in bcrypt, salt 10
                    const hash = bcrypt.hashSync(req.body.uPassword, 10);
                    userDate.UPassword = hash;
                    db.user.create(userDate)
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

    router.get("/profile/:id",(req,res) =>{
        db.user.findOne({
            where: {id: req.params.id}
        })
            .then(user => {
                if(user){
                    res.send(user);
                }else {
                    res.send({error: 'error'})
                }
            }).catch(err => {
                res.send(err);
        })

    });

    router.put("/update/:id",(req,res) =>{
        db.user.update(req.body ,{
            where:{id: req.params.id}
            }
        )
            .then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    })

// login

    router.post("/login", (req, res) => {
        console.log(req.body);
        db.user.findOne({
            where: {UEmail: req.body.uEmail},
        })
            .then(user => {
                if (bcrypt.compareSync(req.body.upassword, user.upassword)) {
                    res.json(user)
                } else {
                    res.send('email ou le mot de passe ')
                }
            }).catch(err => {
            res.send('error ' + err)
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
            clientID: confiAuth.facebookAuth.clientID,
            clientSecret: confiAuth.facebookAuth.clientSecret,
            callbackURL: confiAuth.facebookAuth.callbackURL,
            enableProof: true,
            profileFields: ['id', 'displayName', 'emails', 'photos']
        },
        function (accessToken, refreshToken, profile, done) {

            process.nextTick(function () {
                db.user.findOne({
                    where: {'FBId': profile.id}
                })
                    .then(user => {
                        if (user) {
                          done(user)
                        } else {
                            db.user.create({
                                'FBId': profile.id,
                                'UFacebook': profile.displayName,
                                'UFirstName': profile.name.givenName,
                                'ULastName': profile.name.familyName,
                                'UEmail': profile.email,
                                'FBImageURL' : profile.photos[0].value
                            })
                                .then(newuser => {
                                    done(newuser);
                                })
                                .catch(err => {
                                    done(err);
                                })
                        }
                    })
                    .catch(err => {
                        if (err) {
                           done(err)
                        }
                    })
            })
        }
    ));


    return router;

};


