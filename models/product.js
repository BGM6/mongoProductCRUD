const { Schema, model } = require('mongoose');

const productSchema = new Schema({
		name: {
				type: String,
				required: true,
		},
		price: {
				type: Number,
				required: true,
				min: [0, 'Price must be a positive number'],
		},
		description: {
				type: String,
		},
		category: {
				type: String,
		}
})

const Product = model('Product', productSchema);

module.exports = Product;
