module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};