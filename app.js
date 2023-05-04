const express = require("express");
const cookieParser = require("cookie-parser");
const formidable = require("express-formidable");

const { Auth } = require("./middlewares/auth");
const auth = require("./routes/auth");
const category = require("./routes/category");

const app = express();

app.use(formidable());
app.use(cookieParser());

const db = require("./models");
db.sequelize.sync();

app.use("/api/v1/auth", auth);
// Auth
app.use(Auth);
app.use("/api/v1/category", category);

module.exports = app;
