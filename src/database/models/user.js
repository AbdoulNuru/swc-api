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
      skills: { type: DataTypes.ARRAY(DataTypes.JSON) },
      interests: { type: DataTypes.ARRAY(DataTypes.JSON) },
    },
    {}
  );
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};
