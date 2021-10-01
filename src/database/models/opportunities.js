module.exports = (sequelize, DataTypes) => {
  const Opportunities = sequelize.define(
    "Opportunities",
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      title: DataTypes.STRING,
      fieldNeeded: DataTypes.STRING,
      company: DataTypes.STRING,
      date: DataTypes.DATE,
      posterId: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  Opportunities.associate = (models) => {
    // associations can be defined here
    Opportunities.belongsTo(models.User, {
      foreignKey: "posterId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return Opportunities;
};
