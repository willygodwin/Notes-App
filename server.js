// Dependencies

const express = require('express');
const path = require('path');
const router = require('./routes/routes.js');

// Sets up the Express App

const server = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
server.use(express.static(__dirname+'/public'));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(router);


server.listen(PORT,() => console.log(`Server is running on PORT:${PORT}`));