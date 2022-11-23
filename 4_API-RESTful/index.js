const express = require('express');
const multer = require('multer');
const app = express();

const productsRouter = require('./routes/ProductsRouter');
const ViewsRouter = require('./routes/ViewsRouter');
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/views', ViewsRouter)

app.listen(PORT,()=>{
})