const express = require("express"); //引用express
const cors = require("cors"); //解决跨域问题

const server = express(); //创建server实例
server.use(cors()); //解决跨域问题

server.use(express.static("./public")); //使用express.static  定义首页， 注意加前缀会导致错误

//错误处理中间件
server.use((err, req, res, next) => {
  console.log("发生了错误");
  res.send(err.message);
});
// nodemon app.js 开启服务器！
server.listen(3007, () => {
  console.log("welcome to http://127.0.0.1:3007");
});
