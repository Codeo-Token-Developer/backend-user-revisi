if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV === 'development') {
    require('dotenv').config();
};

//Dependencies
const express = require('express');
const app = express();
const cors = require('cors');

//var
const { PORT } = process.env;

//mongoDB Connection;
require('./db.connect')();

//Route
const mainRoute = require('./routes/index');
const errHandler = require('./middlewares/errHandler');

//app.use
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use(mainRoute);
app.use(errHandler);

app.listen(PORT, () => console.log(`Server started on ${PORT}`))