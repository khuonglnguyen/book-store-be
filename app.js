const express = require("express");
const cors = require('cors')
const cookieParser = require("cookie-parser");
const formidable = require("express-formidable");

const { Auth } = require("./middlewares/auth");
const auth = require("./routes/auth");
const category = require("./routes/category");
const author = require("./routes/author");
const publisher = require("./routes/publisher");
const book = require("./routes/book");
const order = require("./routes/order");

const app = express();
app.use(cors())

app.use(formidable());
app.use(cookieParser());

const db = require("./models");
db.sequelize.sync();

app.use("/api/v1/auth", auth);
// Auth
app.use(Auth);
app.use("/api/v1/category", category);
app.use("/api/v1/author", author);
app.use("/api/v1/publisher", publisher);
app.use("/api/v1/book", book);
app.use("/api/v1/order", order);

module.exports = app;
