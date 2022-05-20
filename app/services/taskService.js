var Task = require('../models').task 

exports.create = (req, res) => {

    if (!req.body.username && req.body.email && req.body.task) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    const task = {
      username: req.body.username,
      email: req.body.email,
      task: req.body.task,
      done: req.body.done ? req.body.done : false
    };

    Task.create(task)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message 
        });
      });
  };

  exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username:  `%${username}%` } : null;
    Task.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Task.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };

  exports.findAllByDone = (req, res) => {
    Task.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving task."
        });
      });
  };

  exports.update = (req, res) => {
  
    if (!req.body.task) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    const task = {
      task: req.body.task,
      done: req.body.done ? req.body.done : false
    };

    Task.update(task, { where: { id: req.body.id } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message 
        });
      });
  };