const express = require('express');
const Product = require('./models/product');
const PORT = 3000;
const path = require('path');
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

//ejs setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/products', async (req, res) => {
		const product = await Product.find({});
		res.render('products', { product });
})

app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
});
