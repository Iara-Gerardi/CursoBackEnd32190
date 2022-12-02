const express = require('express');
const cartRouter = express.Router;

const { createCart, deleteCart, getCart, addToCart, deleteFromCart } = require('../controllers/CartController');


cartRouter.post('/', createCart);
cartRouter.delete('/:id', deleteCart);
cartRouter.get('/:id/productos', getCart);
cartRouter.post('/:id/productos', addToCart);
cartRouter.post('/:id/productos/:id_prod', deleteFromCart);