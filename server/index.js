const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const checkForSession = require('./middlewares/checkForSession');

const swag_ctrl = require('./controllers/swag_controller');
const auth_ctrl = require('./controllers/auth_controller');
const cart_ctrl = require('./controllers/cart_controller');
const search_ctrl = require('./controllers/search_controller')

const app = express()
const {SERVER_PORT, SESSION_SECRET} = process.env

app.use(bodyParser.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(checkForSession);
// app.use(express.static(`${__dirname}/../build`));

// get swag
app.get('/api/swag', swag_ctrl.read);

// login to session
app.post('/api/login', auth_ctrl.login);
// register for session
app.post('/api/register', auth_ctrl.register);
// signout of session
app.post('/api/signout', auth_ctrl.signout);
// read user info
app.get('/api/user', auth_ctrl.getUser);

// add item to cart
app.post('/api/cart', cart_ctrl.add);
// checkout cart
app.post('/api/cart/checkout', cart_ctrl.checkout);
// delete item from cart
app.delete('/api/cart', cart_ctrl.delete)

// 
app.get('/api/search', search_ctrl.search)

const PORT = SERVER_PORT;
app.listen((PORT), () => console.log(`${PORT} is lit`))