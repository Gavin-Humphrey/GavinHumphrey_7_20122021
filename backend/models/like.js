'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        static associate(models) {
            models.User.belongsToMany(models.Message, {
                through: models.Like,
                foreignKey: 'userId',
                otherKey: 'messageId',
            });

            models.Message.belongsToMany(models.User, {
                through: models.Like,
                foreignKey: 'messageId',
                otherKey: 'userId',
            });

            models.Like.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user',
            });

            models.Like.belongsTo(models.Message, {
                foreignKey: 'messageId',
                as: 'message',
            });
        }
    };
    Like.init({
        iduser: DataTypes.INTEGER,
        idmessage: DataTypes.INTEGER,
        like: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Like',
    });
    return Like;
};
