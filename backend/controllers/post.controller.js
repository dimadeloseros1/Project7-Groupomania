const fs = require('fs');
const user = require('./user.controllers');
const jwt = require('jsonwebtoken');
const models = require("../models/")
const {User} = require('../models')

module.exports = {

    createPost : function(req, res, next) {

        // Params
        let title = req.body.title || 'Test Title';
        let content = req.body.data.content;
        let img = req.body.img || ''
        let attachment = req.body.attachment || '';
        let userId = JSON.parse(req.headers.authorization).username



        
        if(!attachment) {
            attachment = '';
        } else {
            attachment = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        User
        .findOne({ where: { username: userId} })
        .then((user) => {userId= user.dataValues.id
        
        
        
        
        
        
       

        
        let newPost = models.post.create({
            title: title,
            content: content,
            img: img,
            attachment: attachment ,
            createdAt: Date.now(),
            updatedAt:Date.now(),
            likes: 0,
            UserId: userId
        })
        .then((newPost) => res.status(201).json({
            'postId': newPost.id
        }))
        .catch(error => res.status(400).json({ error }));

    })
    },

    getAllPost : function (req, res, next) {
        models.post.findAll({
            include: User,
            order:[["createdAt", "DESC"]]
        })
        
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(404).json({ error }));
        
    },

    modifyPost : function (req, res, next) {
        const newPost = { content: req.body.content };
        const userId = req.auth.userId;
        models.post.findOne({
            where: {id: req.params.id}
        })
        .then( post => {
            if (post.UserId === userId) {
                models.post.update(
                    newPost,
                    { where: { id: req.params.id }}
                )
                .then(() => res.status(200).json({ messsage: 'Post modifié !'}))
                .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(404).json({ error }))

    },

    getOnePost : function (req, res, next) {
        models.post.findOne({
            where: { id: req.params.id }
        })
          .then((post) => res.status(200).json(post))
          .catch((error) => res.status(404).json({ error }));
    },

    deletePost: function (req, res, next) {

        const userId = req.auth.userId;
        const isAdmin = req.auth.isAdmin;
        models.post.findOne({
            where: {id: req.params.id}
        })
        .then(deletePost => {
            if ( deletePost.UserId === userId || isAdmin == true ) {
                if (deletePost.attachment !== '') {
                    const filename = deletePost.attachment.split('/images/'[1])
                    fs.unlink(`images/${filename}`)
                }
                models.post.destroy({
                    where: {id: req.params.id}
                })
                .then(() => res.status(200).json({ message: 'Post supprimé'}))
                .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(404).json({ error }));
    },

    LikePost: function (req, res, next) {
        const userId = req.auth.userId;
        if (req.body.like == 1) {
            models.post.findOne({
                where: {id: req.params.id}
            })
            .then(postLiked => {
                models.Like.create({
                    postId: postLiked.id,
                    userId: userId
                })
                .then(() => res.status(201).json({ message: 'Post liked!'}))
                .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(404).json({ error }));
        }
        if (req.body.like == 0) {
            models.post.findOne({
                where: {id: req.params.id}
            })
            .then(postDisliked => {
                models.Like.destroy({
                    where: {
                        postId: postDisliked.id,
                        userId: userId
                    }
                })
                .then(() => res.status(200).json({ message: 'Like is erased'}))
                .catch(error => res.status(404).json({ error }));
            })
            .catch(error => res.status(404).json({ error }));
        }

    }
}