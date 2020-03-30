const express = require ('express');
const Router = express.Router();
const { updateVerification } = require('../../controllers/user/userController');

Router.get('/:token', updateVerification);

module.exports = Router;