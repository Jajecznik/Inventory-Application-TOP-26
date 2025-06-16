const { Router } = require('express');

const router = Router();

const indexController = require("../controllers/indexController");

router.get('/', indexController.getAllCategoriesAndGames);
router.post('/', indexController.createNewCategory);
router.get('/category/:category_name', indexController.getGamesOfSelectedCategory);
router.post('/update/:category_name', indexController.updateCategory);
router.post('/category/update/:category_name', indexController.updateCategory);
router.post('/delete/category/:category_name', indexController.deleteCategory);

router.post('/create/game', indexController.createGame);
router.post('/delete/game/:game_id', indexController.deleteGame);

module.exports = router;
