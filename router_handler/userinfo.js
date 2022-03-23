const db = require("../db/index");
const bcrypt = require("bcryptjs");

exports.getUserInfo = (req, res) => {
  sql_userinfo =
    "select id,username,nickname,email,status,user_pic from ev_users where id=?";
  db.query(sql_userinfo, req.user.id, (err, results) => {
    if (err) {
      return res.cc(err);
    }
    if (results.length != 1) {
      return res.cc("未知错误");
    }
    res.send({
      status: 0,
      message: "获取用户基本信息成功！",
      data: results[0],
    });
  });
};

exports.SetUserInfo = (req, res) => {
  sql_setuserinfo = "update ev_users set ? where id=?";
  const userinfo = req.body;
  db.query(
    sql_setuserinfo,
    [{ nickname: userinfo.nickname, email: userinfo.email }, req.user.id],
    (err, results) => {
      if (err) {
        return res.cc(err);
      }
      if (results.affectedRows != 1) {
        return res.cc("未知错误:");
      }
      return res.cc("修改用户信息成功!", 0);
    }
  );
};

exports.resetPassword = (req, res) => {
  sql_queryPWD = "select password from ev_users where id=?";

  db.query(sql_queryPWD, req.user.id, (err, results) => {
    if (err) {
      return res.cc(err);
    }
    if (results.length != 1) {
      return res.cc("未知错误:");
    }
    const comparePWD = bcrypt.compareSync(
      req.body.old_password,
      results[0].password
    );
    if (!comparePWD) {
      return res.cc("旧密码错误");
    }

    sql_resetPWD = "update ev_users set password=? where id=? ";
    req.body.new_password = bcrypt.hashSync(req.body.new_password, 10);
    db.query(
      sql_resetPWD,
      [req.body.new_password, req.user.id],
      (err, results) => {
        if (err) {
          return res.cc(err);
        }
        if (results.affectedRows != 1) {
          return res.cc("未知错误:");
        }
        console.log("重置密码成功!");
        return res.cc("重置密码成功!", 0);
      }
    );
  });
};

exports.updateAvatar = (req, res) => {
  sql = "update ev_users set user_pic=? where id = ?";
  db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
    if (err) {
      return res.cc(err);
    }
    if (results.affectedRows != 1) {
      return res.cc("未知错误:");
    }
    res.cc("头像设置成功", 0);
  });
};
