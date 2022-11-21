const express = require('express');
const ViewsRouter = express.Router();
const {getSubmitForm, getEditForm} = require('../controllers/ViewsController');

ViewsRouter.get('/', getSubmitForm)
ViewsRouter.get('/edit', getEditForm)

module.exports = ViewsRouter;