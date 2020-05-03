var express = require('express');
var bodyParser = require('body-parser');
//Create express app
var app = express();
//parse requests of content-type - application/x-www-formurlencoded
app.use(bodyParser.urlencoded({ extended: true}));
//parse requests of content-type - application/json
app.use(bodyParser.json());

//Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('error', function(){
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function(){
    console.log('Successfully connected to the database.');
});

//define a simple route
app.get('/', function(req, res){
    res.json({"message": "Welcome to My Online Furniture Store."});
});

//Require Product routes
require('./app/routes/products.routes.js')(app);

//listen for requests
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});