const express = require("express"); //引用express
EpnsSDK = require("@epnsproject/backend-sdk-staging").default;

const server = express(); //创建server实例

const CHANNEL_PK =
  "0x91300fac0bb785f0d0dae1d71ceff8dfd3abf1795581760d71c756e7742c1c88"; // the private key of the channel

// Initialise the SDK
const epnsSdk = new EpnsSDK(CHANNEL_PK);

server.use(express.urlencoded({ extended: false })); // 用express自带的包解析 urlencoder， 此后便可以使用 x-www-from

//设置首页
server.get("/", function (req, res) {
  res.send("welcome");
});
server.post("/post", function (req, res) {
  const body = req.body.sss;
  res.send(body);
});

const tempmd1 = async (req, res, next) => {
  const response = await epnsSdk.sendNotification(
    "0xa7213590C8238038E06595F6be04a27b2A2f57b1", //the recipients of the notification
    "pushNotificationTitle", // push notification title
    "pushNotificationBody", //push notification body
    "notificationTitle", //the title of the notification
    "notificationBody", //the body of the notification
    3, //1 - for broadcast, 3 - for direct message, 4 - for subset.
    "link" //the CTA of the notification, the link which should be redirected to when they click on the notification
  );
  console.log(response);
  next();
};
//使用局部中间件
server.get("/tempmd", tempmd1, (req, res) => {
  res.send("The coupon has been sent to the wallet via EPNS！");
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
