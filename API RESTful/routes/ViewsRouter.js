const express = require('express');
const ViewsRouter = express.Router();
const getSubmitForm = require('../controllers/ViewsController');

ViewsRouter.get('/', getSubmitForm)

module.exports = ViewsRouter;