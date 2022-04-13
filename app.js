const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Voiture = require('./models/Voiture');

mongoose.connect('mongodb+srv://maester:maesterpro@cluster0.l3tqs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
app.use(express.json());  

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.post('/api/voiture/new', (req, res, next) => {
  delete req.body._id;
  const voiture = new Voiture({
      ...req.body
  });
  voiture.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
});
 
app.get('/api/voiture/:id', (req, res, next) => {
    Voiture.findOne({ _id: req.params.id })
      .then(voiture => res.status(200).json(voiture))
      .catch(error => res.status(404).json({ error }));
  });

app.get('/api/voitures', (req, res, next) => {
    Voiture.find()
      .then(voiture => res.status(200).json(voiture))
      .catch(error => res.status(400).json({ error }));
  });

  app.put('/api/voiture/:id', (req, res, next) => {
    Voiture.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

  app.delete('/api/voiture/:id', (req, res, next) => {
    Voiture.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });

module.exports = app;