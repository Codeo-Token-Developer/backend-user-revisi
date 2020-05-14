if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV === 'development') {
    require('dotenv').config();
};
// require('dotenv').config();
//Dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const SocketIo = require('socket.io');
const Io = SocketIo(server);

//var
const { PORT } = process.env;

//mongoDB Connection;
require('./db.connect')();

//Cron job
const { DeleteRegisterToday  } = require('./helpers/cronJob');
DeleteRegisterToday();

//Route
const mainRoute = require('./routes/index');
const errHandler = require('./middlewares/errHandler');

//app.use
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use((req,res,next) => {
    req.Io = Io;
    next();
});

app.use(mainRoute);
app.use(errHandler);

Io.on('connection', socket => {
    console.log('Io connect')
    socket.on('disconnect', () => {
        console.log('Io disconnect')
    })
})


server.listen(PORT, () => console.log(`Server started on ${PORT}`))