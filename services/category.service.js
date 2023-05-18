const db = require("../models/index.js");
const categories = db.categories;

const getAll = async (pageIndex = 1, pageSize = 10) => {
  try {
    return await categories.findAndCountAll({
      offset: pageIndex - 1,
      limit: pageSize,
      order: [["category_id", "DESC"]],
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getById = async (id) => {
  try {
    return await categories.findByPk(id);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const add = async (data) => {
  try {
    return await categories.create(data);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const update = async (id, data) => {
  try {
    const { category, description } = data;
    return await categories.update(
      {
        category,
        description,
      },
      {
        where: { category_id: id },
      }
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};

const remove = async (id) => {
  try {
    return await categories.destroy({
      where: { category_id: id },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { getAll, getById, update, add, remove };
