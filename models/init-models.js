var DataTypes = require("sequelize").DataTypes;
var _author = require("./author");
var _book = require("./book");
var _category = require("./category");
var _order = require("./order");
var _order_detail = require("./order_detail");
var _publisher = require("./publisher");
var _user = require("./user");

function initModels(sequelize) {
  var author = _author(sequelize, DataTypes);
  var book = _book(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var order = _order(sequelize, DataTypes);
  var order_detail = _order_detail(sequelize, DataTypes);
  var publisher = _publisher(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  book.belongsTo(author, { as: "author", foreignKey: "author_id" });
  author.hasMany(book, {
    as: "books",
    foreignKey: "author_id",
    onDelete: "cascade",
  });
  order_detail.belongsTo(book, {
    as: "book",
    foreignKey: "book_id",
    onDelete: "cascade",
  });
  book.hasMany(order_detail, { as: "order_details", foreignKey: "book_id" });
  book.belongsTo(category, { as: "category", foreignKey: "category_id" });
  category.hasMany(book, {
    as: "books",
    foreignKey: "category_id",
    onDelete: "cascade",
  });
  order_detail.belongsTo(order, {
    as: "order",
    foreignKey: "order_id",
    onDelete: "cascade",
  });
  order.hasMany(order_detail, { as: "order_details", foreignKey: "order_id" });
  book.belongsTo(publisher, { as: "publisher", foreignKey: "publisher_id" });
  publisher.hasMany(book, {
    as: "books",
    foreignKey: "publisher_id",
    onDelete: "cascade",
  });
  order.belongsTo(user, { as: "user", foreignKey: "user_id" });
  user.hasMany(order, { as: "orders", foreignKey: "user_id" });

  return {
    author,
    book,
    category,
    order,
    order_detail,
    publisher,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
