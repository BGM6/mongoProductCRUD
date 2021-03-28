const mongoose = require('mongoose');
const Product = require('./models/product');

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
		console.log('DATABASE CONNECTED');
})

const seedProducts = [
		{
				name: 'Michael Jackson Greatest Hits',
				price: 10,
				description: 'The King Of Pop',
				category: 'Music'
		},
		{
				name: 'Corsair k70 Keyboard',
				price: 100,
				description: 'Mechanical Gaming Keyboard — CHERRY MX Red',
				category: 'Electronics'
		},
		{
				name: 'Razer Mamba Elite Mouse',
				price: 50,
				description: 'Wired Gaming Mouse',
				category: 'Electronics'
		},
		{
				name: 'Hulk Funko Pop',
				price: 12,
				description: 'Funko Pop! Marvel: Avengers Game',
				category: 'Toys'
		},
		{
				name: 'Catlike Whisper',
				price: 200,
				description: 'Road Cycling Helmet',
				category: 'Sporting Goods'
		},
]

Product.insertMany(seedProducts)
.then(result => console.log(result))
.catch(error => console.log(error));
