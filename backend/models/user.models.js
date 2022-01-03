module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          async ensureEmailIsUnique(email) {
            if (await User.findOne({ where: { email } })) throw new Error('Email already used!');
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return User;
  };
  