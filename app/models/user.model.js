module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("user", {
      login: {
        type: Sequelize.STRING, unique: true
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    }, {
        createdAt: false,

        // If don't want updatedAt
        updatedAt: false,

    });
    return Task;
  };