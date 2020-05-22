const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

//connect to mongodb
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/ninjago', { useNewUrlParser: true });
// mongoose.Promise = global.Promise;

//middleware for parsing JSON
app.use(bodyParser.json());

//middleware for initializing routes
app.use('/api', require('./routes/api'));

//middleware for handiling errors
app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
});

// listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests on port 4000');
});