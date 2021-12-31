// imports
const models = require("../models");
const db = require("../config_db");
const User = db.users;
const Comment = db.comments;
const Like = db.likes;
const Message = db.messages;

const fs = require('fs');

// trouver tous utilisateurs
exports.findAllUsers = (req, res, next) => {
    User.findAll()
        .then(users => {
            console.log(users);
            res.status(200).json({data: users});
        })
        .catch(error => res.status(400).json({ error }));
};

// trouver un utilisateur par son id
exports.findOneUser = (req, res, next) => {

    User.findOne({ where: {id: req.params.id} })
        .then(user => {
            userData.id = user.id
            userData.lastName = user.lastName
            userData.userName = user.userName
            userData.userName = user.userName
            userData.email = user.email
            userData.createdAt = user.createdAt
            userData.isAdmin = user.isAdmin
        })
        .then(() => {
            Message.count({ where: { userId: req.params.id } })
                .then(total => {
                    userData.totalMessages = total
                })
        })
        .then(() => {

            res.status(200).json(user)
        })
        .catch(error => res.status(404).json({ error }));
};

// trouver tous les utilisateurs par leurs noms
exports.findAllUserByName = (req, res, next) => {

    User.findAll({ where: {firstname: req.params.name}})
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => res.status(404).json({ error }));
};

// modifier un utilisateur
exports.modifyUser = (req, res, next) => {
    // éléments de la requète
    const firstname = req.body.firstname;
    const lastname =  req.body.lastname;

    // vérification que tous les champs sont remplis
    if(firstname === null || firstname === '' || lastname === null ||lastname === '') {
        return res.status(400).json({'error': "Les champs 'nom' et 'prénom' doivent être remplis "});
    }
    // gestion d'ajout/modification image de profil
    const userObject = req.file ?
        {
            ...req.body.user,
            imageUrl: req.file.filename
        } : { ... req.body};

    User.update({ ...userObject, id:  req.params.id}, { where: {id: req.params.id} })
        .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
        .catch(error => res.status(400).json({ error }));
};


/**
 * find a way to include deleteOneUser by isAdmin
 */

// pour supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
    Like.destroy({where: {userId: req.params.id}})
        .then(() =>
            Comment.destroy({where: {userId: req.params.id}})
                .then(() =>
                    Message.findAll({where: {userId: req.params.id}})
                        .then(
                            (messages) => {
                                messages.forEach(
                                    (message) => {
                                        Comment.destroy({where: {messageId: message.id}})
                                        Like.destroy({where: {messageId: message.id}})
                                        Message.destroy({where: {id: message.id}})
                                    }
                                )
                            }
                        )
                        .then(() =>
                            User.findOne({ where: {id: req.params.id} })
                                .then(user => {
                                    const filename = user.imageUrl;
                                    fs.unlink(`images/${filename}`, () => {
                                        User.destroy({ where: {id: req.params.id} })
                                            .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
                                    })
                                })
                        )
                )
        )
        .catch(error => res.status(400).json({ error }));
}

