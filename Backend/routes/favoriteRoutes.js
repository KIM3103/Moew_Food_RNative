const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');

router.get('/:userId', favoriteController.getFavoriteDishes);
router.post('/:userId/:dishId', favoriteController.addFavoriteDish);
router.delete('/:userId/:dishId', favoriteController.removeFavoriteDish);

module.exports = router;