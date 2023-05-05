const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.categories = require("./category.js")(sequelize, Sequelize);
db.users = require("./user.js")(sequelize, Sequelize);
db.authors = require("./author.js")(sequelize, Sequelize);
db.publishers = require("./publisher.js")(sequelize, Sequelize);
db.books = require("./book.js")(sequelize, Sequelize);
db.orders = require("./order.js")(sequelize, Sequelize);
db.orderdetails = require("./order_detail.js")(sequelize, Sequelize);

module.exports = db;