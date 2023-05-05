const db = require("../models/index.js");
const orders = db.orders;
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

const getById = async (id) => {
  try {
    return await orders.findByPk(id);
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

module.exports = {
  getAll,
  getById,
  add,
  remove,
  addDetails,
  getDetailByOrderId,
};
