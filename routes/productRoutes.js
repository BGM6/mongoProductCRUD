const express = require('express');
const router = express.Router();
const product = require('../controllers/productControllers');

router.route('/')
.get(product.renderProducts)

router.route('/new')
.get(product.renderNewProduct)
.post(product.newProduct)

router.get('/:id/update', product.renderUpdate)

router.route('/:id')
.get(product.renderShowPage)
.put(product.updateProduct)
.delete(product.delete)

module.exports = router;
