const db = require("../models/index.js");
const authors = db.authors;

const getAll = async (pageIndex = 1, pageSize = 10) => {
  try {
    return await authors.findAndCountAll({
      offset: pageIndex - 1,
      limit: pageSize,
      order: [["author_id", "DESC"]],
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getById = async (id) => {
  try {
    return await authors.findByPk(id);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const add = async (data) => {
  try {
    return await authors.create(data);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const update = async (id, data) => {
  try {
    return await authors.update(data, {
      where: { author_id: id },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const remove = async (id) => {
  try {
    return await authors.destroy({
      where: { author_id: id },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { getAll, getById, update, add, remove };
