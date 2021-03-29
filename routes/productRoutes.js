const express = require('express');
const router = express.Router();
const product = require('../controllers/productControllers');
const catchAsync = require('../utils/catchAsync');

router.route('/')
.get(catchAsync(product.renderProducts))

router.route('/new')
.get(catchAsync(product.renderNewProduct))
.post(catchAsync(product.newProduct))

router.get('/:id/update', catchAsync(product.renderUpdate))

router.route('/:id')
.get(catchAsync(product.renderShowPage))
.put(catchAsync(product.updateProduct))
.delete(catchAsync(product.delete))

module.exports = router;
