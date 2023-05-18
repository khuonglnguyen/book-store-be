var express = require("express");
var router = express.Router();
const { getAll, getById } = require("../services/book.service");

router.post("/search", async (req, res, next) => {
  const { pageIndex, pageSize, keyword } = req.fields;
  const result = await getAll(pageIndex, pageSize, keyword);
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

module.exports = router;
