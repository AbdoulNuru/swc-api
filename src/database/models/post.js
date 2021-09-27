module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      article: DataTypes.STRING,
      media: DataTypes.STRING,
      comments: { type: DataTypes.ARRAY(DataTypes.JSON) },
    },
    {}
  );
  Post.associate = () => {
    // associations can be defined here
  };
  return Post;
};
