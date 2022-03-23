const Joi = require("joi");

const schema_longi = Joi.object({
  username: Joi.string().alphanum().min(2).max(30).required(),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});
exports.joi_login = (req, res, next) => {
  console.log(req.body);
  const x = schema_longi.validate(req.body);
  if (x.error instanceof Joi.ValidationError) {
    return res.cc(x.error);
  }
  console.log("验证通过！");
  next();
};

const schema_setUserInfo = Joi.object({
  nickname: Joi.string().alphanum().min(4).max(10),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

exports.joi_setuserInfo = (req, res, next) => {
  const x = schema_setUserInfo.validate(req.body);
  if (x.error instanceof Joi.ValidationError) {
    return res.cc(x.error);
  }
  console.log("用户信息set验证通过");
  next();
};

const schema_resetPWD = Joi.object({
  old_password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),

  new_password: Joi.not(Joi.ref("old_password")).concat(
    Joi.string()
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .required()
  ),
});
exports.joi_resetPWD = (req, res, next) => {
  const x = schema_resetPWD.validate(req.body);
  if (x.error instanceof Joi.ValidationError) {
    return res.cc(x.error);
  }

  console.log("新密码格式正确");
  next();
};

const schema_avatar = Joi.object({
  avatar: Joi.string().dataUri().required(),
});
exports.joi_avatar = (req, res, next) => {
  const x = schema_avatar.validate(req.body);
  if (x.error instanceof Joi.ValidationError) {
    return res.cc(x.error);
  }
  console.log("新头像格式正确");
  next();
};
