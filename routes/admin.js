const express = require('express');
const router = express.Router();
const { findOne,  verifyToken} = require("../app/services/userService")
const { update } = require("../app/services/taskService")

/* GET users listing. */
router.get('/', function(req, res) {
  
});

router.post('/task', function(req, res) {
    update(req, res)
});

module.exports = router;
