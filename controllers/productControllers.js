const Product = require('../models/product');

module.exports.renderProducts = async (req, res) => {
		const product = await Product.find({});
		res.render('products', { product });
};

module.exports.renderNewProduct = (req, res) => {
		res.render('new')
}

module.exports.newProduct = async (req, res) => {
		const newProduct = new Product(req.body);
		await newProduct.save();
		res.redirect('/products');
}

module.exports.renderShowPage = async (req,res) => {
		const {id} = req.params;
		const product = await Product.findById(id);
		res.render('show', { product });
}

module.exports.renderUpdate = async (req, res) => {
		const { id } = req.params;
		const product = await Product.findById(id);
		res.render('update', { product });
}

module.exports.updateProduct = async (req, res) => {
		const { id } = req.params;
		const product = await Product.findByIdAndUpdate(id, req.body, {
				runValidators: true,
				new: true,
		});
		res.redirect(`/products/${product._id}`)
}

module.exports.delete = async (req, res) => {
		const { id } = req.params;
		await Product.findByIdAndDelete(id);
		res.redirect('/products');
}
