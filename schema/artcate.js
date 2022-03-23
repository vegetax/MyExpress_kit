const joi = require('joi');

const schema_artcate = joi.object({
    name: joi.string().required(),

    alias: joi.string()
        .alphanum().required(),

})
exports.joi_artcate = (req, res, next) => {
    const x = schema_artcate.validate(req.body);
    if (x.error instanceof joi.ValidationError) {
        return res.cc(x.error);
    }
    console.log('artcate 格式正确');
    next()
}

const schema_id = joi.number().min(1).integer().required();

exports.joi_id = (req, res, next) => {
    const x = schema_id.validate(req.params.id);
    if (x.error instanceof joi.ValidationError) {
        return res.cc(x.error);
    }
    console.log('id 格式正确');
    next()
}

const schema_update = joi.object({
    name: joi.string().required(),

    alias: joi.string()
        .alphanum().required(),
    id: joi.number().min(1).integer().required(),


})
exports.joi_updatecate = (req, res, next) => {
    const x = schema_update.validate(req.body);
    if (x.error instanceof joi.ValidationError) {
        return res.cc(x.error);
    }
    console.log('格式正确');
    next()
}