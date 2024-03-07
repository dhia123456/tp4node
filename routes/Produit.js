const express = require('express');
const router = express.Router();
const Produit = require('../models/Produit');
const bodyParser = require('body-parser'); // Importer body-parser

// Utiliser body-parser pour analyser les corps de requête JSON
router.use(bodyParser.json());
router.get('/all', (req, res) => {
  Produit.find().populate('categorie').then(
    (data) => {
      res.send(data);
    },
    (err) => {
      res.status(500).send(err); // Envoyer une réponse avec un code d'erreur 500 en cas d'erreur
    }
  );
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let updateData = req.body; // Renommer a en updateData pour plus de clarté

  Produit.findByIdAndUpdate(id, updateData, { new: true }).then(
    (updated) => {
      res.send(updated);
    },
    (err) => {
      res.status(500).send(err);
    }
  );
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  Produit.findByIdAndDelete(id).then(
    (deleted) => {
      res.send(deleted);
    },
    (err) => {
      res.status(500).send(err);
    }
  );
});

router.post('/ajouter', (req, res) => {
  let newProduit = req.body; // Renommer Produit en newProduit pour éviter la confusion avec le modèle
  let produit = new Produit(newProduit);

  produit.save().then(
    (data) => {
      console.log(data);
      res.send(data);
    },
    (error) => {
      console.log(error);
      res.status(500).send(error);
    }
  );
});

module.exports = router;