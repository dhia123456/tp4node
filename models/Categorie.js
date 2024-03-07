const mongoose = require('mongoose');
const { Schema } = mongoose; // Ajoutez cette ligne pour importer Schema

const Categorie = new Schema({
    nom: String,
    description: String,
    
});

module.exports = mongoose.model('Categorie', Categorie);
