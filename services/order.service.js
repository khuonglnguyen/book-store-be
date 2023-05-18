const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = require("../models/index.js");
const initModels = require("../models/init-models.js");
const models = initModels(sequelize);
const orderdetails = db.orderdetails;

const getAll = async (pageIndex = 1, pageSize = 10, userId = null) => {
  try {
    return await orders.findAndCountAll({
      offset: pageIndex - 1,
      limit: pageSize,
      ...(userId && { where: { user_id: userId } }),
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getAllDetail = async () => {
  try {
    return await models.order_detail.findAll({
      include: ["book"],
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getById = async (id) => {
  try {
    return await orders.findByPk(id);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getTotalBookOrdered = async () => {
  try {
    const orderdetail = await orderdetails.findAll({ raw: true });
    let total = 0;
    orderdetail.forEach((item) => {
      total += item.amount;
    });

    return total;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getDetailByOrderId = async (order_id) => {
  try {
    return await orderdetails.findAndCountAll({ order_id });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const add = async (data) => {
  try {
    return await orders.create(data);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const addDetails = async (order_id, data) => {
  try {
    const orderdetail = data.map((item) => ({ ...item, order_id }));
    return await orderdetails.bulkCreate(orderdetail);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const remove = async (id) => {
  try {
    return await orders.destroy({
      where: { order_id: id },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const removeDetail = async (id) => {
  try {
    return await orderdetails.destroy({
      where: { orderdetail_id: id },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  addDetails,
  getDetailByOrderId,
  getTotalBookOrdered,
  getAllDetail,
  removeDetail,
};
