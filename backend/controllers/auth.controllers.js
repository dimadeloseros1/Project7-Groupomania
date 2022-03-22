const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: './config/.env', encoding: "latin1"});

const {User} = require("../models");



module.exports.signUp = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                poste: req.body.poste,
                isAdmin: req.body.isAdmin,
                picture : `${req.protocol}://${req.get('host')}/images/pictureProfile/firstProfile.png`,
                password: hash
            })
                .then((user) => {
                    return res.status(201).send(user)
                })
                .catch((err) => {
                    res.status(500).json({err: err, message: 'problème sur /register ou fonction SignIn'})
                })
        })
        .catch(error => res.status(500).json({error: error, message: 'problème sur /register ou fonction SignIn'}));
};

exports.login = (req, res, next) => {
    User.findOne({where: {email: req.body.email}})
        .then(user => {
            if (!user) {
                return res.status(401).json({message: 'Utilisateur non trouvé ! '})
            }

            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({message: 'Mot de passe incorrect! '})
                    }
                    return res.status(200).send({
                        uuidUser: user.uuid,
                        isAdmin : user.isAdmin,
                        // La méthode  sign()  du package  jsonwebtoken  utilise une clé secrète pour encoder un token qui peut contenir un payload personnalisé et avoir une validité limitée.
                        token: jwt.sign(
                            {
                                uuidUser: user.uuid,
                                isAdmin: user.isAdmin
                            },
                            process.env.TOKEN_KEY,
                            {expiresIn: "24h"}
                        )
                    })
                })
                .catch(error => res.status(500).json({error: error}))

        })
        .catch(error => res.status(500).json({error: error}))

};

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect("/");
}