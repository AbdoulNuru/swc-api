module.exports = (sequelize, DataTypes) => {
  const Opportunities = sequelize.define(
    "Opportunities",
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      title: DataTypes.STRING,
      fieldNeeded: DataTypes.STRING,
      company: DataTypes.STRING,
      date: DataTypes.STRING,
    },
    {}
  );
  Opportunities.associate = () => {
    // associations can be defined here
  };
  return Opportunities;
};
