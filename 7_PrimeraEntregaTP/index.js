const express = require('express');
const cartRouter = require('./routes/CartRouter');
const productRouter = require('./routes/ProductsRouter');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/products', productRouter);
app.use('/cart', cartRouter);

app.listen(PORT, () => { console.log(`servidor en puerto ${PORT}`) })