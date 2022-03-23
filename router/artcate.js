const express = require('express');
const artcate = require('../router_handler/artcate');
const Joi = require('../schema/artcate')

const router = express.Router();

router.post('/cate', artcate.artcate)
router.post('/addcate', Joi.joi_artcate, artcate.addcate)
router.get('/deletecate/:id', Joi.joi_id, artcate.deletecate)
router.get('/cate/:id', Joi.joi_id, artcate.getcate)
router.post('/updatecate', Joi.joi_updatecate, artcate.update)


module.exports = router;