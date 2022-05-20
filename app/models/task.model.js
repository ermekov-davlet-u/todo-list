module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      task: {
        type: Sequelize.STRING
      },
      done: {
        type: Sequelize.BOOLEAN
      }
    });
    return Task;
  };