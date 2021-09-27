module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define(
    "Notifications",
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      message: DataTypes.STRING,
    },
    {}
  );
  Notifications.associate = () => {
    // associations can be defined here
  };
  return Notifications;
};
