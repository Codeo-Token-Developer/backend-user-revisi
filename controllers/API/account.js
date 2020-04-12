const Account = require('../../models/AccountSide/account.model');
const axios = require('axios');
const API_KEY = process.env.API_KEY;
const apiUrl = process.env.API_URL
const headers = { "Content-Type": "application/json", "X-API-Key": API_KEY }
const { encryptAccount, decryptAccount } = require('../../helpers/encryptKey');

class ApiController {

    

};

module.exports = ApiController;