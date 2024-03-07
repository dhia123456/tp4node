const express = require('express');
const router = express.Router();
const Categorie = require('../models/Categorie');
const Produit = require('../models/Produit');
const bodyParser = require('body-parser'); // Importer body-parser

// Utiliser body-parser pour analyser les corps de requête JSON
router.use(bodyParser.json());


// Créer une nouvelle catégorie
router.post('/ajout', async (req, res) => {
    try {
        const { nom, description } = req.body;
        const nouvelleCategorie = new Categorie({ nom, description });
        const categorieEnregistree = await nouvelleCategorie.save();
        res.status(201).json(categorieEnregistree);
    } catch (erreur) {
        console.error('Erreur lors de la création de la catégorie :', erreur);
        res.status(500).json({ message: 'Erreur lors de la création de la catégorie.' });
    }
});

// Modifier une catégorie existante
router.put('/categories/:categorieId', async (req, res) => {
    try {
        const { nom, description } = req.body;
        const categorieModifiee = await Categorie.findByIdAndUpdate(
            req.params.categorieId,
            { nom, description },
            { new: true }
        );
        res.json(categorieModifiee);
    } catch (erreur) {
        console.error('Erreur lors de la modification de la catégorie :', erreur);
        res.status(500).json({ message: 'Erreur lors de la modification de la catégorie.' });
    }
});

// Supprimer une catégorie
router.delete('/categories/:categorieId', async (req, res) => {
    try {
        const categorieSupprimee = await Categorie.findByIdAndRemove(req.params.categorieId);
        // Supprimer également les références à cette catégorie dans les produits associés
        await Produit.updateMany({ categorie: req.params.categorieId }, { $unset: { categorie: 1 } });
        res.json(categorieSupprimee);
    } catch (erreur) {
        console.error('Erreur lors de la suppression de la catégorie :', erreur);
        res.status(500).json({ message: 'Erreur lors de la suppression de la catégorie.' });
    }
});

// Lister toutes les catégories avec leurs produits associés
router.get('/all', async (req, res) => {
    try {
        const categoriesAvecProduits = await Categorie.find();
        res.json(categoriesAvecProduits);
    } catch (erreur) {
        console.error('Erreur lors de la récupération des catégories :', erreur);
        res.status(500).json({ message: 'Erreur lors de la récupération des catégories.' });
    }
});

module.exports = router;
