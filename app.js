
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const databaseConnection = require('./database/connection');
const peopleRoutes = require("./routes/people");


const appServer = require('./apis/server').createServer(app);


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use('/people', peopleRoutes);

app.use('/', (req,res) => {
    res.render('index.html');
    res.end();
})



appServer.listen();