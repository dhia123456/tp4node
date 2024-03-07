const mongoose = require('mongoose');
const { Schema } = mongoose;

const Produit = new Schema({
    nom: String,
    description: String,
    prix: Number,
    categorie: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie'
    }
});

module.exports = mongoose.model('Produit', Produit);
