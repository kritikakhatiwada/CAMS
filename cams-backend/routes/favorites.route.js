const express = require('express');
const router = express.Router();
const favoritesController = require('../controller/favorites.controller');

// Add to favorites
router.post('/add', favoritesController.addFavorite);

// Remove from favorites
router.delete('/remove/:college_id', favoritesController.removeFavorite);

// Get all favorites of a student
router.get('/student', favoritesController.getFavoritesByStudent);

module.exports = router;
