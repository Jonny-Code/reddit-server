const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  create: (req, res, next) => {
    userModel.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      },
      (err, result) => {
        if (err) next(err);
        else
          res.json({
            status: "success",
            message: "added new user",
            data: null
          });
      }
    );
  },

  authenticate: (req, res, next) => {
    userModel.findOne({ email: req.body.email }, (err, userInfo) => {
      if (err) next(err);
      else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign(
            { id: userInfo._id },
            req.app.get("secretKey"),
            { expiresIn: "1h" }
          );
          res.json({
            status: "success",
            message: "user was found",
            data: { user: userInfo, token: token }
          });
        } else {
          res.json({
            status: "error",
            message: "wrong email or password",
            data: null
          });
        }
      }
    });
  }
};
