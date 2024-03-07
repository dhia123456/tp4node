const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bodyParser = require('body-parser'); // Importer body-parser

// Utiliser body-parser pour analyser les corps de requête JSON
router.use(bodyParser.json());


router.post('/register',async (req,res)=>{
    try {
        //Destructuring assignment ES6
        const {username,password} = req.body;
        const user = new User ({username,password})
        await user.save();
        res.status(201).send(' User Registred !')
    }catch(err){
        res.status(400).send(err.message)
    }
});

router.post('/login',async (req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username:username});
        const passwordValidate = await bcrypt.compare(password,user.password);
        passwordValidate ? res.status(200).send(`WELCOME ${user.username}`) :res.status(401).send('WRONG PASSWORD')
    }catch(err){
        res.status(400).send(err.message);
    }
})

//login
//model Post + CRUD


module.exports = router;