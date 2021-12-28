const db = require("../config_db");
const Like = db.likes;

// logique métier : lire tous les likes
exports.findAllLikes = (req, res, next) => {
    Like.findAll({where: {
            messageId: req.params.id}})
        .then(likes => {
            console.log(likes);
            res.status(200).json({data: likes});
        })
        .catch(error => res.status(400).json({ error }));
};

// logique métier : créer un like
exports.createLike = (req, res, next) => {
    
    Like.findAll()
        .then(likes => {
                console.log(likes);
                if(likes.length === 0) {
                    const like = new Like({
                        iduser: req.userId,
                        idmessage: req.params.messageId,
                        like: 1
                    });
                    // Enregistrement de l'objet like dans la base de données
                    like.save()
                        .then(() => {
                            Like.findAll({
                                where: {messageid: req.body.messageId}
                            }).then(likes => {
                                res.status(200).json({ like: likes.length});
                            })
                        })
                        .catch(error => res.status(400).json({ error }));
                } else {
                    Like.destroy({ where: {
                            messageId: req.body.messageId,
                            userId: req.body.userId }})
                        .then(() => {
                            Like.findAll({
                                where: {messageId: req.body.messageId}
                            }).then(likes => {
                                res.status(200).json({ like: likes.length});
                            })
                        })
                        .catch(error => res.status(400).json({ error }));
                }
            }
        )
}