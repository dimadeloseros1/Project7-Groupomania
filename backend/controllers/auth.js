//Imports
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const validator = require('validator');


//Controlers
module.exports = {
    //*****SIGNUP*****//
    signup: function (req, res) {
        //params
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        //Verify user's informations securirty
        let validateMail = validator.isEmail(req.body.email)
        let validatePwd = validator.isStrongPassword(req.body.password)

        if (validateMail == false) {
            return res.status(401).json({ message: 'mail invalide' });
        }
        if (validatePwd == false) {
            return res.status(401).json({ message: 'Veuillez entrer un mot de passe valide' });
        }
        //check if user exist
        if (!username) {
            return res.status(401).json({ message: "Tous les champs sont requis" }); 
        } else
            models.user.findOne({
                attributes: ['email'],
                where: { email: email }
            })
                .then(function (userFound) {
                    if ((!userFound) && (validateMail === true) && (validatePwd === true)) {
                        //encrypted password
                        bcrypt.hash(password, 5, function (err, bcryptedPwd) {
                            let attachement = `${req.protocol}://${req.get('host')}/images/logo-user.png`;
                            if (req.file) {
                                attachement = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                            }
                            const newUser = models.user.create({
                                username: username,
                                email: email,
                                password: bcryptedPwd,
                                attachement: attachement,
                                isAdmin: 0
                            })
                                .then(function (newUser) {
                                    return res.status(201).json({
                                        'userId': newUser.id
                                    })
                                })
                                .catch(function (err) {
                                    return res.status(500).json("L'utilisateur ne peut pas être créé");
                                });
                        });
                    }
                    else {
                        return res.status(401).json("L'utilisateur existe déjà");
                    }
                })
                .catch(function (err) {
                    return res.status(500).json("L'utilisateur ne peut pas être vérifié");
                })
    },

    //*****LOGIN*****//
    login: function (req, res) {
        //params
        const email = req.body.email;
        const password = req.body.password;

        if (email === null || password === null) {
            return res.status(400).json("Veuillez entrer un email et un mot de passe");
        }

        //check if user exist
        models.user.findOne({
            where: { email: email }
        })
            .then(function (userFound) {
                if (userFound) {
                    //check if password is valid
                    bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
                        if (resBycrypt) {
                            return res.status(201).json({
                                'userId': userFound.id,
                                'token': jwtUtils.generateUserToken(userFound),
                                'isAdmin': userFound.isAdmin,
                            });
                        }
                        else {
                            return res.status(403).json("Mot de passe invalide");
                        }
                    });
                }
                else {
                    return res.status(403).json("L'utilisateur n'existe pas");
                }
            })
            .catch(function (err) {
                return res.status(500).json("L'utilisateur ne peut pas être vérifié");
            });
    },
    /******GET ALL USERS*********/
    getAllUsers: async function (req, res) {
        try {
            const users = await models.user.findAll({
            })
            return res.status(200).json({ 'users': users })
        }
        catch (err) {
            return res.status(500).json({ 'error': `${err}` })
        }
    }
}