var mongoose = require('mongoose');

const dbConnect = () => {
    const mongoURI = process.env.MONGO_URL;
    // const mongoURI = 'mongodb://localhost/test-codeo-token-com22'
    mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('Welcome to MongoDb')
    });
};

module.exports = dbConnect;