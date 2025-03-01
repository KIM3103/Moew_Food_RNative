const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');

router.post('/', dishController.createDish);
router.get('/', dishController.getAllDishes);
router.get('/:dishId', dishController.getDishById);
router.put('/:dishId', dishController.updateDishById);
router.delete('/:dishId', dishController.deleteDishById);

module.exports = router;