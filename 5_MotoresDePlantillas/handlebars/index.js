const express = require('express')
const hbs = require('hbs')
const app = express()

app.set('view engine', 'hbs')

// app.use(express.static('public'))

app.listen(8080)