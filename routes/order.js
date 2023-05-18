var express = require("express");
var router = express.Router();
const {
  getAll,
  getById,
  add,
  remove,
  addDetails,
  getDetailByOrderId,
  getAllDetail,
  removeDetail,
} = require("../services/order.service");

router.get("/", async (req, res, next) => {
  const { pageIndex, pageSize, userId } = req.fields;
  const result = await getAll(pageIndex, pageSize, userId);
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

router.get("/all-detail", async (req, res, next) => {
  const result = await getAllDetail();
  if (result) {
    res.status(200).json({
      success: true,
      data: {
        list: result,
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

router.get("/detail/:id", async (req, res, next) => {
  const { id } = req.params;
  const result = await getDetailByOrderId(id);
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
  const { order, products } = req.fields;
  const result = await add(order);
  if (result) {
    const resultDetail = await addDetails(result.dataValues.order_id, products);
    if (resultDetail) {
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

router.delete("/detail/:id", async (req, res, next) => {
  const { id } = req.params;
  const result = await removeDetail(id);
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
