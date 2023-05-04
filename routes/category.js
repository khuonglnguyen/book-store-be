var express = require("express");
var router = express.Router();
const db = require("../models");
const categories = db.categories;
const Op = db.Sequelize.Op;

/* GET categories. */
router.get("/", function (req, res, next) {
  categories
    .findAll()
    .then((data) => {
      if (data?.length > 0) {
        res.send({
          success: true,
          data: data
        });
      } else {
        res.status(404).send({
          message: "Not found!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
});

/* GET chucvu. */
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  chucvus
    .findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
});

/* POST chucvu. */
router.post("/", function (req, res, next) {
  const { ten, nguoitao } = req.body;

  if (ten && nguoitao) {
    chucvus
      .findAll({
        where: { ten: ten },
      })
      .then((data) => {
        if (data?.length === 0) {
          chucvus
            .create({
              ten,
              nguoitao,
            })
            .then((data) => {
              res.send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message,
              });
            });
        } else {
          res.status(400).send({
            message: "Tên chức vụ đã tồn tại!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  } else {
    res.status(400).send({
      message: "Vui lòng điền đầy đủ thông tin!",
    });
  }
});

/* PUT chucvu. */
router.put("/:id", function (req, res, next) {
  const { id } = req.params;
  const { ten, nguoicapnhat } = req.body;

  if (ten && nguoicapnhat) {
    chucvus
      .update(
        {
          ten,
          nguoicapnhat,
          ngaycapnhat: Date.now(),
        },
        {
          where: { id: id },
        }
      )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  } else {
    res.status(400).send({
      message: "Vui lòng điền đầy đủ thông tin!",
    });
  }
});

/* DELETE chucvu. */
router.delete("/:id", function (req, res, next) {
  const { id } = req.params;
  chucvus
    .update(
      {
        trangthai: 0,
      },
      {
        where: { id: id },
      }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
});

module.exports = router;
