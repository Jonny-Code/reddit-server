const express = require("express");
const logger = require("morgan");
const posts = require("./routes/posts");
const users = require("./routes/users");
const mongoose = require("./config/database");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
var jwt = require("jsonwebtoken");

const path = require("path");

const PORT = process.env.PORT || 5000;

const app = express();
app.set("secretKey", process.env.SECRET);

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ msg: "mock reddit backend rest api" });
});

const validateUser = (req, res, next) => {
  jwt.verify(
    req.headers["x-access-token"],
    req.app.get("secretKey"),
    (err, decoded) => {
      if (err) res.json({ status: "error", message: err.message, data: null });
      else {
        req.body.userId = decoded.id;
        next();
      }
    }
  );
};

// public route
app.use("/users", users);

// private route
app.use("/posts", posts);

app.get("/favicon.ico", (req, res) => {
  res.sendStatus(204);
});

// handle 404 explicitly
app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// handle errors
app.use((err, req, res, next) => {
  console.error(err);
  if (err.status === 404) res.status(404).json({ message: "Not Found" });
  else res.status(500).json({ message: "something went wrong" });
});

app.listen(PORT, console.log(`Listening on port ${PORT}`));
