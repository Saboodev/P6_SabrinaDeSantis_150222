const express = require('express');
const router = express.Router();

// importation des middleware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// importation du controllers sauces
const saucesCtrl = require('../controllers/sauces');

router.post('/', auth, multer, saucesCtrl.createSauces);
router.post('/:id/like', auth, saucesCtrl.likesAndDislikes);

router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getOneSauces);

router.put('/:id', auth, multer, saucesCtrl.modifySauces);
router.delete('/:id', auth, saucesCtrl.deleteSauces);

module.exports = router;