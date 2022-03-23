const express = require("express"); //引用express
const cors = require("cors"); //解决跨域问题
const userRouter = require("./router/user"); //路由器
const userinfo = require("./router/userinfo"); //路由器中的处理函数
const expressJWT = require("express-jwt"); //解析token
const config = require("./router_handler/config"); //JWT加密秘钥
const artcate = require("./router/artcate");
const project = require("./router/project");

const sever = express(); //一个express实例

sever.use(express.urlencoded({ extended: false })); // 用express自带的包解析 urlencoder， 此后便可以使用 x-www-from
sever.use(cors());

//中间件， 为数据增添一个自定义函数 来传递错误和传递信息
sever.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    //ES6的形参赋值，  不赋值就是1   赋值就可以刷新
    res.send({
      status,
      message: err instanceof Error ? err.message : err, //是error就   error.message
    });
  };
  next();
});

// sever.use(
//   expressJWT({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
//     path: [/^\/api\//],
//   })
// );
//解析用户头文件里的token，确定用户身份
//解析完后，所有res自带一个 res.user , 里面包含当初签名进去的信息
//只有API的域名不需要验证token

sever.use("/api", userRouter);
sever.use("/my", userinfo);
sever.use("/my/article", artcate);
sever.use("/project", project);

//错误中间件
sever.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") return res.cc("身份认证失败！");
  res.cc(err);
});
// nodemon app.js 开启服务器！
sever.listen(3007, () => {
  console.log("welcome to http://127.0.0.1:3007");
});
