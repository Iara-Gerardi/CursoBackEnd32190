const express = require('express');
const productRouter = express.Router();

const { getProducts, getProductById, addProduct, editProduct, deleteProduct } = require('../controllers/ProductsController');

productRouter.get('/', getProducts);
productRouter.get('/:id', getProductById);
productRouter.post('/', addProduct);
productRouter.put('/:id', editProduct);
productRouter.delete('/:id', deleteProduct);

module.exports = productRouter