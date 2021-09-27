module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      article: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      media: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      comments: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        defaultValue: [],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("Posts");
  },
};
