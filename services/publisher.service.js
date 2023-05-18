const db = require("../models/index.js");
const publishers = db.publishers;

const getAll = async (pageIndex = 1, pageSize = 10) => {
  try {
    return await publishers.findAndCountAll({
      offset: pageIndex - 1,
      limit: pageSize,
      order: [["publisher_id", "DESC"]],
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getById = async (id) => {
  try {
    return await publishers.findByPk(id);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const add = async (data) => {
  try {
    return await publishers.create(data);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const update = async (id, data) => {
  try {
    return await publishers.update(data, {
      where: { publisher_id: id },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const remove = async (id) => {
  try {
    return await publishers.destroy({
      where: { publisher_id: id },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { getAll, getById, update, add, remove };
