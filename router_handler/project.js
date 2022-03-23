const db = require("../db/index"); //数据库

exports.projects = (req, res) => {
  _personId = req.query.personId
    ? " where personId =" + req.query.personId
    : "";
  //   _name = req.query.name ? "name =" + req.query.name.toString() : "";
  console.log(_personId);
  sql = `select * from mt_projects   ${_personId}   order by id asc`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.cc(err);
    }
    if (results.length === 0) {
      return res.cc("工程列表获取未知错误");
    }
    res.send({
      status: 0,
      message: "工程列表获取成功",
      data: results,
    });
  });
};

exports.workers = (req, res) => {
  sql = "select * from mt_workers order by id asc";
  db.query(sql, (err, results) => {
    if (err) {
      return res.cc(err);
    }
    if (results.length === 0) {
      return res.cc("未知错误");
    }
    res.send({
      status: 0,
      message: "人员列表获取成功",
      data: results,
    });
  });
};
