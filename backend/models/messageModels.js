module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Message;
};
