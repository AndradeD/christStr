'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('../src/config');
const cors = require('cors');

// const Product = require('./models/product');
// const Customer = require('./models/customer');
// const Order = require('./models/order');

const indexRouter = require('./routes/index');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

mongoose.connect(config.connectionString);

const app = express();
// const router = express.Router();
app.use(cors());

app.use(bodyParser.json({
    limit: '15mb'
}));
app.use(bodyParser.urlencoded( { extended: false } ));

//Habilita o CORS
// app.use(function(req,res,next){
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, x-access-token');
//     res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
//     next();
// });


// app.use('/', indexRouter);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders',orderRoute);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


module.exports = app;