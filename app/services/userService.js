const User = require('../models').user 
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


  exports.findOne = async(req, res) => {

    try {
      const { login, password } = req.body;
  
      if (!(login && password)) {
        res.status(400).send("Заполните все поля");
      }
      const user = await User.findOne({ where: { login: login} });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = await jwt.sign(
          { user_id: user._id, login },
          "secret",
          {
            expiresIn: "2h",
          }
        );
        res.status(200).json({user, token: token});
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }


    
  };

  exports.register = async (req, res) => {
    try {
      const { login, password } = req.body
      if (!(login && password )) {
        res.status(400).send("Поля не должны быть пустыми");
      }
      const oldUser = await User.findOne({ where: { login: login } });
  
      if (oldUser) {
        return res.status(409).send("Такой пользователь уже существует");
      }
      encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        login: login.toLowerCase(), 
        password: encryptedPassword,
      });
      const token = jwt.sign(
        { user_id: user._id, login },
        "secret",
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      res.status(201).json(user);
    } catch (err) {
      console.log(err.message);
    }
  }

  exports.verifyToken = (req, res, next) => {
    const token =
     req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send("Вы не авторизованы");
    }
    try {
      const decoded = jwt.verify(token, "secret");
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };
  

  