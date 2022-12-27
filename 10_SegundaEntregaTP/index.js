const express = require('express');
const mongoose = require('mongoose');
const cartRouter = require('./routes/CartRouter');
const productRouter = require('./routes/ProductsRouter');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.DBKEY)
    .then(() => { console.log('conexion exitosa') })
    .catch((err) => { console.log(err) })

app.use('/products', productRouter);
app.use('/cart', cartRouter);

app.listen(PORT, () => { console.log(`servidor en puerto ${PORT}`) })