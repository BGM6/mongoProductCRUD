const express = require('express');
const Product = require('./models/product');
const PORT = 3000;
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');


//mongo connection
mongoose.connect('mongodb://localhost:27017/productDB', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION OPEN'));
db.once('open', () => {
		console.log('DATABASE CONNECTED')
})


const app = express();

//middleware parsers
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//ejs setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//CRUD
app.get('/products', async (req, res) => {
		const product = await Product.find({});
		res.render('products', { product });
})
//create
app.get('/products/new', (req, res) => {
		res.render('new')
})

app.post('/products/new', async (req, res) => {
		const newProduct = new Product(req.body);
		await newProduct.save();
		res.redirect('/products');
})

//show page
app.get('/products/:id', async (req,res) => {
		const {id} = req.params;
		const product = await Product.findById(id);
		res.render('show', { product });
})

//update
app.get('/products/:id/update', async (req, res) => {
		const { id } = req.params;
		const product = await Product.findById(id);
		res.render('update', { product });
})

app.put('/products/:id', async (req, res) => {
		const { id } = req.params;
		const product = await Product.findByIdAndUpdate(id, req.body, {
				runValidators: true,
				new: true,
		});
		res.redirect(`/products/${product._id}`)
});

//delete
app.delete('/products/:id', async (req, res) => {
		const { id } = req.params;
		await Product.findByIdAndDelete(id);
		res.redirect('/products');
})

app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
});
