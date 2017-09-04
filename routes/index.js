const express = require('express');
const router = express.Router();

const product = require('./product/product');
const blog = require('./blog/posts');
const admin = require('./admin/admin');

router.use('/products', product);
router.use('/post', blog);
//router.use('/order',order);
//router.use('/inventory',inventory);
router.use('/admin',admin);

module.exports = router;