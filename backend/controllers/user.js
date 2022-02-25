// Importation de bcrypt pour hasher le mdp
const bcrypt = require('bcrypt');
// Importation de crypto-js pour le chiffrement du mail
const cryptoJs = require("crypto-js");
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv').config();

const User = require('../models/user');

// hasher le mdp avant de l'envoyer dans la bdd
// salt = 10 le nombre de fois où l'algorithme de hashage sera exécuté
exports.signup = (req, res, next) => {

    // chiffrer l'email avant l'envoi dans la bdd
    const emailCryptoJs = cryptoJs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: emailCryptoJs,
          password: hash
        });
        console.log(user);
        // envoi du user dans la bdd
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.login = (req, res, next) => {

    const emailCryptoJs = cryptoJs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
    // rechercher dans bdd si l'utilisateur existe
    User.findOne({ email: emailCryptoJs })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        // contrôle de la validité du password
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            // envoi du userID et du token d'authentification dans la response du serveur 
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                process.env.TOKEN_USER,
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };