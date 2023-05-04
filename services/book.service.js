const defaultConfig = require("../config/default.config.js");
const cloudinaryv2 = require("cloudinary").v2;
const db = require("../models/index.js");
const books = db.books;

const getAll = async (pageIndex = 1, pageSize = 10) => {
  try {
    return await books.findAndCountAll({
      offset: pageIndex - 1,
      limit: pageSize,
    });
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

module.exports = { getAll, getById, update, add, remove };
