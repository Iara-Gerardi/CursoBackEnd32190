const express = require('express');
const multer = require('multer');
const app = express();

const productsRouter = require('./routes/ProductsRouter')
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', productsRouter);

app.listen(PORT,()=>{
  console.log(`app listening on port ${PORT}`)
})