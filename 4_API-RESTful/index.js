const express = require('express');
const multer = require('multer');
const cors = require("cors");
const path = require('path')
const app = express();

const productsRouter = require('./routes/ProductsRouter');
const ViewsRouter = require('./routes/ViewsRouter');
const PORT = process.env.PORT || 8080;

app.use( express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/views', ViewsRouter)

app.use(
  cors({
    credentials: true,
    origin: [`http://localhost:8081`],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);



app.listen(PORT,()=>{
})