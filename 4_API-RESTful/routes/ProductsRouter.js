const express = require('express');
const ProductsRouter = express.Router();
const { getProducts, getProductByID, addProduct, editProduct, deleteProduct, getImage } = require('../controllers/ProductsController');
const handleImages = require('../middleware/uploadImg')

ProductsRouter.get('/', getProducts);
ProductsRouter.post('/', handleImages, addProduct);

ProductsRouter.get('/:id', getProductByID);
ProductsRouter.put('/:id', editProduct);
ProductsRouter.delete('/:id', deleteProduct);

ProductsRouter.get('/img/:file', getImage);

module.exports = ProductsRouter;