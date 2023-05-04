const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinaryv2 = require("cloudinary").v2;
const config = require("../config/default.config.js");
const db = require("../models");
const users = db.users;

const Login = async (phone_number, password) => {
  try {
    const user = await users.findOne({
      where: { phone_number },
      raw: true,
    });
    if (!user) {
      return false;
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const { id, fullname, avatar } = user;
      // Get jwt configuration
      const {
        jwt: { secret },
      } = config;
      // Generate token
      const token = jwt.sign(
        {
          id,
          fullname,
          avatar,
        },
        secret
      );
      return { id, fullname, avatar, token };
    }
  } catch (error) {
    console.log(error);
  }

  return false;
};

const Regist = async (data, files) => {
  try {
    const { fullname, phone_number, password, address, state_code } = data;
    const {
      bcrypt: { saltRounds },
      cloudinary,
    } = config;

    cloudinaryv2.config(cloudinary);
    const result = await cloudinaryv2.uploader.upload(files.avatar.path);
    if (result) {
      const hash = await bcrypt.hash(password, saltRounds);
      const user = await users.create({
        fullname,
        phone_number,
        password: hash,
        address,
        avatar: result.url,
        state_code,
      });
      if (!user) {
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

const GetTokenInfo = async (auth, secret) => {
  if (auth.authorization && auth.authorization.split(" ")[0] === "Bearer") {
    const token = auth.authorization.split(" ")[1];
    let decode = "";
    if (token) {
      decode = jwt.verify(token, secret);
    }
    return decode;
  }
  return;
};

module.exports = {
  Login,
  Regist,
  GetTokenInfo,
};
