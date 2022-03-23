//user的路由
const express = require("express");
const userhandler = require("../router_handler/user"); // 处理函数库
const Joi = require("../schema/user"); // 验证中间件库

const router = express.Router(); //实例化一个路由

router.post("/reguser", Joi.joi_login, userhandler.reguser);

router.post("/login", Joi.joi_login, userhandler.login);

module.exports = router; //返回的是一个类     exports返回的是一个函数
