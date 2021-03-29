const express = require('express');
const productRoutes = require('./routes/productRoutes');
const PORT = 3000;
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ExpressError = require('./utils/ExpressError');

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
//express router
app.use('/products', productRoutes );

//error catching routes
app.all('*', (req, res, next) => {
		next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
		const { statusCode = 500 } = err;
		if(!err.message) err.message = 'Sorry something went wrong';
		res.status(statusCode).render('error.ejs', { err });
})
app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
});
