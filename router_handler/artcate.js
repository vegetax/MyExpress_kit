const db = require('../db/index') //数据库

exports.artcate = (req, res) => {
    sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
    db.query(sql, (err, results) => {
        if (err) {
            return res.cc(err);
        }
        if (results.length === 0) {
            return res.cc('未知错误')
        }
        res.send({
            status: 0,
            message: '文章类别获取成功',
            data: results,
        })
    })
}

exports.addcate = (req, res) => {
    sql_dupli = 'SELECT * FROM ev_article_cate where name=? or alias=?';
    db.query(sql_dupli, [req.body.name, req.body.alias], (err, results) => {
        if (err) {
            return res.cc(err);
        }
        if (results.length >= 2) {
            return res.cc('name 和 alias都被占用')
        }

        if (results.length == 1 && results[0].name === req.body.name) {
            return res.cc('name被占用')
        }
        if (results.length == 1 && results[0].alias === req.body.alias) {
            return res.cc('alias被占用')
        }
        sql = 'insert into ev_article_cate set? '
        db.query(sql, { name: req.body.name, alias: req.body.alias }, (err, results) => {
            if (err) {
                return res.cc(err);
            }
            if (results.affectedRows != 1) {
                return res.cc('未知错误')
            }
            res.send({
                status: 0,
                message: '文章新增成功',
            })
        })
    })
}

exports.deletecate = (req, res) => {
    sql = 'update ev_article_cate set is_delete ="1" where id=?';

    db.query(sql, req.params.id, (err, results) => {
        if (err) {
            return res.cc(err);
        }
        if (results.affectedRows != 1) {
            return res.cc('未知错误')
        }
        res.send({
            status: 0,
            message: '分类删除成功',
        })
    })
}

exports.getcate = (req, res) => {
    sql = 'select * from  ev_article_cate where id=? and is_delete=0';

    db.query(sql, req.params.id, (err, results) => {
        if (err) {
            return res.cc(err);
        }
        if (results.length != 1) {
            return res.cc('id不存在')
        }
        res.send({
            status: 0,
            message: '获取成功',
            data: results[0],
        })
    })
}

exports.update = (req, res) => {
    sql_dupli = 'SELECT * FROM ev_article_cate where id=?';
    db.query(sql_dupli, req.body.id, (err, results) => {
        if (err) {
            return res.cc(err);
        }
        if (results.length != 1) {
            return res.cc('ID匹配失败')
        }
        sql_dupli = 'SELECT * FROM ev_article_cate where name=? or alias=?';
        db.query(sql_dupli, [req.body.name, req.body.alias], (err, results) => {
            if (err) {
                return res.cc(err);
            }
            if (results.length >= 2) {
                return res.cc('name 和 alias都被占用')
            }

            if (results.length == 1 && results[0].name === req.body.name) {
                return res.cc('name被占用')
            }
            if (results.length == 1 && results[0].alias === req.body.alias) {
                return res.cc('alias被占用')
            }
            sql = 'update ev_article_cate set? where id=? '
            db.query(sql, [{ name: req.body.name, alias: req.body.alias, is_delete: 0 }, req.body.id], (err, results) => {
                if (err) {
                    return res.cc(err);
                }
                if (results.affectedRows != 1) {
                    return res.cc('未知错误')
                }
                res.send({
                    status: 0,
                    message: '文章分类修改成功',
                })
            })
        })
    })
}