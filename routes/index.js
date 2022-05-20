var express = require('express');
const { create, findAll, findAllByDone } = require('../app/services/taskService');
var router = express.Router();

/* GET home page. */


router.post('/task', function( req, res ) {
  create(req, res)
});

router.get('/task', function( req, res ) {
  findAll(req, res)
});

router.post('/task-done', function( req, res ) {
  findAllByDone(req, res)
});

module.exports = router;
