const express = require("express"); //引用express
const cors = require("cors"); //解决跨域问题

const server = express(); //创建server实例
server.use(cors()); //解决跨域问题
const myrouter = require("./router"); //导入模块化路由

//设置首页
server.get("/", function (req, res) {
  res.send("welcome");
});
server.use(express.static("./public")); //使用express.static  定义首页， 注意加前缀会导致错误

//定义中间件  中间件本质就是一个带next的函数
const md = (req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); //手动解决跨域问题， 任何网站都能访问
  console.log("这是最简单的中间件");
  req.starttime = Date.now(); //此后所有的req都有了starttime属性
  next(); //必须有next
};
server.use(md); //使用全局中间件，必须放在路由前面

server.use("/api", myrouter); //调用路由，并且

/* 局部中间start */
//定义局部生效的中间件  本质就是不用use
const tempmd1 = (req, res, next) => {
  req.x = 1;
  console.log("这是一个局部生效的中间件1");
  next();
};
const tempmd2 = (req, res, next) => {
  req.x++;
  console.log("这是一个局部生效的中间件2");
  next();
};
//使用局部中间件
server.get("/tempmd", tempmd1, tempmd2, (req, res) => {
  res.send("局部生效的中间件生效" + req.x + "次");
});
/* 局部中间件end */

//错误处理中间件
server.use((err, req, res, next) => {
  console.log("发生了错误");
  res.send(err.message);
});
// nodemon app.js 开启服务器！
server.listen(3007, () => {
  console.log("welcome to http://127.0.0.1:3007");
});
