const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config( + '/../config/.env');
const {User} = require("../models");



module.exports.signUp = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                email: req.body.email,
                // firstName: req.body.firstName,
                // lastName: req.body.lastName,
                username: req.body.username,
                // post: req.body.poste,
                // isAdmin: req.body.isAdmin,
                // picture : `${req.protocol}://${req.get('host')}/images/pictureProfile/firstProfile.png`,
                password: hash,
                postView: '1'

            })
                .then((user) => {
                    return res.status(201).send(user)
                })
                .catch((err) => {
                    res.status(500).json({err: err})
                })
        })
        .catch(error => res.status(500).json({error: error, message: 'Cant sign in'}));
};

exports.login = (req, res, next) => {
    console.log('Connexion :', req.body);
    User
      .findOne({ where: { username: req.body.username} })
      .then((user) => {
        
        if (!user) { return res.status(404).json({ error: 'Cant login', message: "can't log in"}) }
        bcrypt
          .compare(req.body.password, user.dataValues.password)
          .then(valid => { 
            console.log("attempted password", req.body.password)
            console.log("database password", user.dataValues.password)
            if (!valid) { return res.status(401).json({ error: 'Password is incorrect!', message: "Password is incorrect" }) }
            
            res.status(200).json({
              id: user.dataValues.id,
              firstName: user.dataValues.firstName,
              lastName: user.dataValues.lastName,
              postView: user.dataValues.postView,
            //   job: user.dataValues.job,
            //   url: user.dataValues.url,
            //   admin: user.dataValues.admin,
              token: jwt.sign(
                { id: user.dataValues.id },
                process.env.TOKEN_KEY,
                { expiresIn: '24h' }
              )
            });
            
          })
          .catch(error => {
            res.status(500).json({ error: error.message })
          })
      })
      .catch(error => res.status(500).json({ error: error.message }));
  };

  module.exports.updateView = (req, res, next) => {
    User.upsert({
        id: req.params.id,
        postView: req.body.postView
    })
}
  
module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect("/");
}