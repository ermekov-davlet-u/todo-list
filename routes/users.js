const express = require('express');
const router = express.Router();
const { findOne, register } = require("../app/services/userService")

/* GET users listing. */
router.post('/login', function(req, res) {
  findOne(req, res)
});
router.post("/register", async (req, res) => {

  register(req, res)

});

module.exports = router;
