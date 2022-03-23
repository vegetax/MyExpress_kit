  //user路由的函数
  const db = require('../db/index') //数据库
  const bcrypt = require('bcryptjs') //password 加密
  const jwt = require('jsonwebtoken') //登陆信息token
  const config = require('./config')




  module.exports.reguser = (req, res) => {
      //检查用户名是否已经存在
      sql_undup = 'select * from ev_users where username=?';
      db.query(sql_undup, req.body.username, (err, results) => {
          if (err) {
              return res.cc(err);
          }
          if (results.length > 0) {
              return res.cc('用户名已被占用，请跟换用户名!');
          }
          req.body.password = bcrypt.hashSync(req.body.password, 10);
          //将用户名 和加密好的密码插入
          sql_insert = 'insert into ev_users set?';
          db.query(sql_insert, { username: req.body.username, password: req.body.password }, (err, results) => {
              if (err) {
                  console.log('err');
                  return res.cc(err);
              }
              if (results.affectedRows !== 1) {
                  console.log('err1');
                  return res.cc(err);
              }
              console.log('ok');
              res.cc('注册成功', 0);
          })
      })
  }

  module.exports.login = (req, res) => {
      //拉取用户名相应的信息
      sql_undup = 'select * from ev_users where username=?';
      db.query(sql_undup, req.body.username, (err, results) => {
          if (err) {
              return res.cc(err);
          }
          if (results.length != 1) {
              return res.cc('登陆失败，该用户未注册');
          }
          //比较加密过的密码是否相同
          if (bcrypt.compareSync(req.body.password, results[0].password)) {
              user_token_info = {...results[0], password: '', user_pic: '' };
              const tokenStr = jwt.sign(user_token_info, config.jwtSecretKey, { //相同就生成一个登陆token
                  expiresIn: '10h', // token 有效期为 10 个小时
              })
              return res.send({
                  status: 0,
                  message: '登陆成功',
                  token: 'Bearer ' + tokenStr
              })
          } else {
              res.cc('登陆失败,用户名密码不匹配');
          }
      })
  }