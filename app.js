const express = require("express");
const cookieParser = require("cookie-parser");
const formidable = require("express-formidable");

const auth = require("./routes/auth");

const app = express();

app.use(formidable());
app.use(cookieParser());

const db = require("./models");
db.sequelize.sync();

app.use("/api/v1/auth", auth);

module.exports = app;
