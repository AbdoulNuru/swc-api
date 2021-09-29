module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      posterId: { type: DataTypes.STRING, allowNull: false },
      article: DataTypes.STRING,
      media: DataTypes.STRING,
      comments: { type: DataTypes.ARRAY(DataTypes.JSON) },
    },
    {}
  );
  Post.associate = (models) => {
    // associations can be defined here
    Post.belongsTo(models.User, {
      foreignKey: "posterId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return Post;
};
