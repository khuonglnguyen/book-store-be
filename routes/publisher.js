var express = require("express");
var router = express.Router();
const {
  getAll,
  getById,
  update,
  add,
  remove,
} = require("../services/publisher.service");

router.get("/", async (req, res, next) => {
  const { pageIndex, pageSize } = req.fields;
  const result = await getAll(pageIndex, pageSize);
  if (result) {
    res.status(200).json({
      success: true,
      data: {
        list: result.rows,
        total: result.count,
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Error!",
    });
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const result = await getById(id);
  if (result) {
    res.status(200).json({
      success: true,
      data: result,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Error!",
    });
  }
});

router.post("/", async (req, res, next) => {
  const result = await add(req.fields);
  if (result) {
    res.status(201).json({
      success: true,
      data: result,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Error!",
    });
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const result = await update(id, req.fields);
  if (result) {
    res.status(200).json({
      success: true,
      data: result,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Error!",
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const result = await remove(id);
  if (result) {
    res.status(200).json({
      success: true,
      data: result,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Error!",
    });
  }
});

module.exports = router;
