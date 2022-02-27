const express = require('express');
const router = express.Router();

// middleware password pour un mdp fort
const password = require("../middleware/password");

// importation du controllers user
const userCtrl = require('../controllers/user');

router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;