const express = require('express');
const Router = express.Router();
const { info, buat } = require('../../controllers/API/totalsupplycodeo')

Router.get('/create', buat);
Router.get('/', info);

module.exports = Router;