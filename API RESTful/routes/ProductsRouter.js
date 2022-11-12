const express = require('express');
const ProductsRouter = express.Router();
const { getProducts, getProductByID, addProduct, editProduct, deleteProduct } = require('../controllers/ProductsController')

ProductsRouter.get('/', getProducts);
ProductsRouter.post('/', addProduct);

ProductsRouter.get('/:id', getProductByID);
ProductsRouter.put('/:id', editProduct);
ProductsRouter.delete('/:id', deleteProduct);

module.exports = ProductsRouter;