//Importing dependencies in server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//Intalizing app and port
const app = express();
const port = 3000;

//Handling get request at /
app.get('/', (req, res)=>{
    res.send("Invalid endpoint")
});

//Handling get request at /blog
app.get('/blog', (req, res)=>{
    res.send("This will get all blog in database")
});

//Handling post request at /blog
app.post('/blog', (req, res)=>{
    res.send("This will create a blog in database")
});

//it start server on localhost:3000 when server.js is excuted
app.listen(port, ()=>{
    console.log('Server is started at port : ' + port);
});
