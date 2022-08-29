const express = require("express"); //导入express
const cors = require("cors"); //解决跨域问题

const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const app = express(); //创建server实例

app.use(express.json()); //使得服务器可以解析json
app.use(express.urlencoded({ extended: false })); //使得服务器可以解析urlencoded数据
app.use(cors()); //解决跨域问题

const owner = "0x2884c2734D00DE83d62c986096E8e94958B6ffAB"; //签名的地址

//签名的私钥
const privateKey =
  "0x0dd1aab1c9260ebdfc5bbd23b406b65c4b07d1af0b0958974f364390181e7a0c";

//签名函数
async function getSign(address, taskId) {
  //用web3.utils.soliditySha3  这样hash值在solidity里用 keccak256(abi.encodePacked(account,uint256(1000))); 可以验证
  let messageHash = web3.utils.soliditySha3(
    { t: "address", v: address },
    { t: "uint256", v: taskId }
  );

  console.log({ messageHash });

  let { signature } = web3.eth.accounts.sign(messageHash, privateKey);
  console.log({ signature });
  return { messageHash, signature };
}

//签名中间件
const md_sign = async (req, res, next) => {
  if (req.body.account && req.body.taskId) {
    console.log("address:" + req.body.account);
    console.log("taskId:" + req.body.taskId);
    res.signature = await getSign(req.body.account, req.body.taskId);
    console.log(res.signature);
  } else {
    console.log("no address or taskId!!!!!!!!!!! ");
  }
  next(); //必须有
};

app.get("/", (req, res) => {
  res.send("welcome!");
});

app.post("/sign", md_sign, (req, res) => {
  res.send(res.signature);
});

app.use((err, req, res, next) => {
  console.log("发生了错误");
  res.send(err.message);
});
/* 错误中间件 end */

app.listen(1100, () => {
  console.log("express server running at http://127.0.0.1:1100");
});
