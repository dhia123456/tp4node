const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('./db/db_connect');
const dotenv = require('dotenv');
dotenv.config();
const Port = process.env.Port;
const produit = require('./routes/Produit');
const Categorie = require('./routes/Categorie');
const user = require('./routes/auth');

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.use(express.urlencoded({ extended: true }));
app.use('/auth', user);
app.use('/produit', produit);
app.use('/categories', Categorie);

app.listen(Port, () => {
    console.log('server work' + Port);
});

let data = {
    name: "amine",
    tasks: ['sport', 'meeting', 'workshops']
};

// Test app first route
app.get('/', (req, res) => {
    // Render the 'home' template using EJS
    res.render('home', { data: data });
});

app.get('/login', (req, res) => {
    // Render the 'login' template using EJS
    res.render('login');
});
