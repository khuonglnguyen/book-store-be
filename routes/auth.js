var express = require("express");
const { Login, Regist, Update } = require("../services/auth.service");
var router = express.Router();

router.post("/login", async (req, res, next) => {
  const result = await Login(req.fields.phone_number, req.fields.password);
  if (result) {
    res.status(200).json({
      success: true,
      data: result,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Phone number or password is incorrect!",
    });
  }
});

router.post("/regist", async (req, res, next) => {
  const result = await Regist(req.fields, req.files);
  if (result) {
    res.status(201).json({
      success: true,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Error!",
    });
  }
});

router.put("/update/:id", async (req, res, next) => {
  const { id } = req.params;
  const result = await Update(id, req.fields, req.files);
  if (result) {
    res.status(201).json({
      success: true,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Error!",
    });
  }
});

module.exports = router;
