module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Opportunities", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      posterId: {
        type: Sequelize.STRING,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "Users",
          key: "id",
          as: "id",
        },
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fieldNeeded: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      company: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
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
    return queryInterface.dropTable("Opportunities");
  },
};
