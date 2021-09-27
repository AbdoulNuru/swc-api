module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      topic: DataTypes.STRING,
      presenter: DataTypes.STRING,
      time: DataTypes.STRING,
      date: DataTypes.STRING,
      location: DataTypes.STRING,
    },
    {}
  );
  Event.associate = () => {
    // associations can be defined here
  };
  return Event;
};
