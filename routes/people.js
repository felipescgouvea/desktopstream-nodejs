const express = require("express");

const Router = express.Router();
const databasePool = require("../connection");

Router.get("/", (req, res) => {
    console.log("route people");
    
    databasePool.getConnection((err, connection) => {
        if(err) console.error(err);
        connection.query('SELECT * FROM people', (err, people) => {
            connection.release();
            console.log(people);
            res.send(people);
        });
    });

});


Router.post("/add", (req, res) => {
    console.log("route people");
    console.log(req.body);
    databasePool.getConnection((err, connection) => {
        if(err) console.error(err);
        var newPeople  = req.body;
        var query = connection.query('INSERT INTO people SET ?', newPeople, function (error, results, fields) {
            if (error) throw error;
            connection.release();
            res.send(newPeople);
        });
    });

});

module.exports = Router;