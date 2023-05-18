var express = require("express");
var router = express.Router();
const {
  getTotal,
  getTotalView,
  getTotalLove,
  getRaking,
} = require("../services/book.service");
const { getTotalBookOrdered } = require("../services/order.service");

router.get("/dashboard", async (req, res, next) => {
  const totalBook = await getTotal();
  const totalView = await getTotalView();
  const totalLove = await getTotalLove();
  const totalOrder = await getTotalBookOrdered();
  const raking = await getRaking();
  if (totalBook && totalView) {
    res.status(200).json({
      success: true,
      data: {
        totalBook,
        totalView,
        totalLove,
        totalOrder,
        raking,
      },
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Error!",
    });
  }
});

module.exports = router;
