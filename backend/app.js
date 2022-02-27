const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose'); //facilite les interactions avec la bdd
const path = require('path');

// Pour l'utilisation des variables d'environnement
const dotenv = require('dotenv').config();

// Importation des routes
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

// Connexion à la bdd mongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_LINK}`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Créer une application express
const app = express();
app.use(morgan("dev")); //loggue les requêtes et les réponses

app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
// Permet de transformer les données de la requête POST en un objet JSON
app.use(express.json());

// Empêche les requêtes malveillantes d'accéder à des données sensibles
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;