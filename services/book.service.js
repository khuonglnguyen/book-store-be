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
const defaultConfig = require("../config/default.config.js");
const cloudinaryv2 = require("cloudinary").v2;
const db = require("../models/index.js");
const initModels = require("../models/init-models.js");
const models = initModels(sequelize);
const books = db.books;

const getAll = async (pageIndex = 1, pageSize = 10, keyword = null) => {
  try {
    return await models.book.findAndCountAll({
      offset: pageIndex - 1,
      limit: pageSize,
      ...(keyword && {
        where: {
          book_title: {
            [Sequelize.Op.like]: `%${keyword}%`,
          },
        },
      }),
      include: ["author", "category", "publisher"],
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getTotal = async () => {
  try {
    const book = await books.findAll({ raw: true });
    return book.length;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getTotalView = async () => {
  try {
    const book = await books.findAll({ raw: true });
    let totalView = 0;
    book.forEach((item) => {
      totalView += item.view;
    });

    return totalView;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getTotalLove = async () => {
  try {
    const book = await books.findAll({ raw: true });
    let totalLove = 0;
    book.forEach((item) => {
      totalLove += item.love;
    });

    return totalLove;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getRaking = async () => {
  try {
    return await books.findAll({ order: [["love", "DESC"]] });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getById = async (id) => {
  try {
    return await books.findByPk(id);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const add = async (data, files) => {
  try {
    const {
      book_title,
      author_id,
      category_id,
      publisher_id,
      pub_date,
      description,
      content,
      amount,
      price,
      currency,
      view,
      love,
    } = data;
    const { cloudinary } = defaultConfig;

    cloudinaryv2.config(cloudinary);
    const result = await cloudinaryv2.uploader.upload(files.image.path);
    if (result) {
      const book = await books.create({
        book_title,
        author_id,
        category_id,
        publisher_id,
        pub_date,
        description,
        content,
        amount,
        price,
        currency,
        view,
        love,
        image: result.url,
      });
      if (!book) {
        return false;
      }

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const update = async (id, data, files) => {
  try {
    if (files.image) {
      const { cloudinary } = defaultConfig;

      cloudinaryv2.config(cloudinary);
      const result = await cloudinaryv2.uploader.upload(files.image.path);
      if (result) {
        const book = await books.update(
          {
            ...data,
            image: result.url,
          },
          { where: { book_id: id } }
        );
        if (!book) {
          return false;
        }

        return true;
      } else {
        return false;
      }
    } else {
      const book = await books.update(
        {
          ...data,
        },
        { where: { book_id: id } }
      );
      if (!book) {
        return false;
      }
    }
  } catch (error) {
    console.log(error);
  }
  return true;
};

const addView = async (id) => {
  try {
    const book = await books.findByPk(id);
    book.dataValues.view += 1;
    const bookUpdate = await books.update(
      {
        view: book.dataValues.view,
      },
      { where: { book_id: id } }
    );
    if (!bookUpdate) {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
  return true;
};

const addLove = async (id) => {
  try {
    const book = await books.findByPk(id);
    book.dataValues.love += 1;
    const bookUpdate = await books.update(
      {
        love: book.dataValues.love,
      },
      { where: { book_id: id } }
    );
    if (!bookUpdate) {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
  return true;
};

const removeLove = async (id) => {
  try {
    const book = await books.findByPk(id);
    book.dataValues.love -= 1;
    const bookUpdate = await books.update(
      {
        love: book.dataValues.love,
      },
      { where: { book_id: id } }
    );
    if (!bookUpdate) {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
  return true;
};

const remove = async (id) => {
  try {
    return await books.destroy({
      where: { book_id: id },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  getAll,
  getById,
  update,
  add,
  remove,
  addLove,
  removeLove,
  addView,
  getTotal,
  getTotalView,
  getTotalLove,
  getRaking,
};
