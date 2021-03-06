module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fieldOfExpertise: DataTypes.STRING,
      skills: { type: DataTypes.ARRAY(DataTypes.STRING) },
      interests: { type: DataTypes.ARRAY(DataTypes.STRING) },
    },
    {}
  );
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Post, {
      foreignKey: "posterId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    User.hasMany(models.Opportunities, {
      foreignKey: "posterId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return User;
};
