const express = require('express');
const userhandler = require('../router_handler/userinfo'); //处理函数
const Joi = require('../schema/user'); //校验中间件

const router = express.Router();

router.get('/userinfo', userhandler.getUserInfo)
router.post('/userinfo', Joi.joi_setuserInfo, userhandler.SetUserInfo)
router.post('/updatepwd', Joi.joi_resetPWD, userhandler.resetPassword)
router.post('/update/avatar', Joi.joi_avatar, userhandler.updateAvatar)

module.exports = router;