const {User, Posts, Comments} = require("../models");
const fs = require("fs");
const bcrypt = require('bcrypt');


module.exports.getAllUsers = (req, res) => {
    User.findAll({include: "posts"})
        .then((users) => {
            return res.status(200).send(users)
        })
        .catch((err) => {
            res.status(500).json({err: 'Something went wrong'})
        })
};

module.exports.userInfo = (req, res, next) => {
    
    const uuid = req.params.UserId
   // console.log(req.params)
    User.findOne({
        where: {id: uuid},
       // include: [{model: Posts, as: "posts", include: ["comment"]}],
    })  
        .then((user) => {
           // console.log(user)
            // user.posts.sort(function (a, b) {
            //     return b.createdAt - a.createdAt
            // })
            return res.status(200).json(user)
        })
        .catch((err) => {
            return res.status(500).json({err})
        })
}

module.exports.deleteUser = (req, res, next) => {
    console.log("About to delete user");    
    const id = req.params.id
    User.findOne({
        where: {id: id},
    })
        .then((user) => {

            // if (user.uuid !== req.auth.uuidUserToken) {
            //     return res.status(400).json({
            //         message: 'Unauthorized request',
            //     })
            // }

            // const filename = user.picture.split('/images/profile/')[1];
            // fs.unlink(`images/profile/${filename}`, () => {

            // })
            
            // Look up all of these user Posts, then delete

            user.destroy()
            return res.status(200).json({message: 'User destroyed'})
        })
        .catch((err) => {
            return res.status(500).json({err: err})
        })
}

module.exports.updateUser = async (req, res, next) => {
    const uuidUser = req.params.uuid
    const {firstName, lastName, email, poste, bio} = req.body
    let password;
    if (req.body.password){
    password = bcrypt.hashSync(req.body.password, 10);
    }
    console.log(password)
    User.findOne({where: {uuid: uuidUser}})
        .then((user) => {

            if (!user) {
                return res.status(400).json({
                    message: "User not found !"
                })
            }

            if (user.uuid !== req.auth.uuidUserToken) {
                return res.status(400).json({
                    message: 'Unauthorized request',
                })
            }

            if ( req.files && req.files.profile) {
                const filename = user.picture.split('/images/profile/')[1];
                fs.unlink(`images/profile/${filename}`, () => {
                    const profileObject = {
                        firstName,
                        lastName,
                        email,
                        poste,
                        bio,
                        picture: `${req.protocol}://${req.get('host')}/images/profile/${req.files.profile[0].filename}`
                    }

                    user.update(profileObject, {
                        where: req.params.uuid
                    }).then(() => {
                        return res.status(200).json({message: 'User upDate with picture', profileObject})
                    })
                        .catch((err) => {
                            return res.status(400).json({err, message: "An error in the data"})
                        })
                })
            } else {
                const profileObject = {
                    firstName, lastName, email, poste, bio,password
                }
                user.update(profileObject, {
                    where: req.params.uuid
                }).then(() => {
                    return res.status(200).json({message: 'An error in the data'})
                })
                    .catch((err) => {
                        return res.status(400).json({err, message: "An error in the data"})
                    })
            }
        })
        .catch((err) => {
            return res.status(500).json({message: "Error update user" ,err: err})
        })
}