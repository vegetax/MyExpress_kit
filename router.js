const express = require("express");

const router = express.Router();

router.get("/road", (req, res) => {
  res.send("模块化路由！get" + req.starttime);
});

router.post("/road", (req, res) => {
  res.send("模块化路由！post");
});

router.post("/post", (req, res) => {
  const body = req.body;
  res.send({
    status: 0,
    msg: "post请求成功",
    data: body,
  });
});

module.exports = router;
