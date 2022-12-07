const express = require('express');
const productRouter = express.Router();

const { getProduct, getProductById, addProduct, editProduct, deleteProduct } = require('../controllers/ProductsController');

productRouter.get('/', getProduct);
productRouter.get('/:id', getProductById);
productRouter.post('/', addProduct);
productRouter.put('/:id', editProduct);
productRouter.delete('/:id', deleteProduct);

module.exports = productRouter