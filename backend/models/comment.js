//Just testing

const { Model } = require('sequelize')
const message = require('./message')

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    
    static associate (models) {
      Comment.belongsTo(models.User, { foreignKey: 'userId' })
      Comment.belongsTo(models.message, { foreignKey: 'messageId' })
    }
  }
  Comment.init(
    {
      messageId: DataTypes.INTEGER,
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Comment'
    }
  )

  Comment.afterCreate(async comment => {
    const message = await comment.getMessage()
    const user = await comment.getUser()

    if (user.id == message.userId) return

    const notification = await sequelize.models.Notification.create({
      content: `<b>${user.firstName} ${
        user.lastName
      }</b> a commenté votre publication du ${message.readableCreatedAt()}`,
      recipientUserId: message.userId,
      messageId: message.id,
      senderUserId: user.id
    })
  })

  return Comment
}

