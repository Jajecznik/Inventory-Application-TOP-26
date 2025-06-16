const db = require('../db/queries');

async function getAllCategoriesAndGames(req, res) {
  const showForm = req.query.addGame === 'true';
  const updateGame = req.query.updateGame === 'true';
  const gameId = req.query.gameId;
  const categories = await db.getAllCategories();
  const games = await db.getAllGames();
  const gameToUpdate = gameId ? await db.getGameById(gameId) : null;

  res.render("index", {
    title: "Gaming paradise",
    categories: categories,
    games: games,
    showForm: showForm,
    updateGame: updateGame,
    gameToUpdate: gameToUpdate,
    view: showForm || updateGame ? 'modal' : null
  });
}

async function getGamesOfSelectedCategory(req, res) {
  let games = [];
  const categories = await db.getAllCategories();
  const categoryName = req.params.category_name;
  const categoryId = await db.getSelectedCategoryId(categoryName);

  if (categoryId) {
    games = await db.getGamesOfSelectedCategory(categoryId);
  }

  res.render("index", {
    title: "Gaming paradise",
    categories: categories,
    games: games,
  });
}

async function createNewCategory(req, res) {
  const newCategory = req.body.category_name;
  await db.createNewCategory(newCategory);

  res.redirect('/');
}

async function updateCategory(req, res) {
  const newCategoryName = req.body.new_category_name;
  const oldCategoryName = req.params.category_name;
  await db.updateCategory(newCategoryName, oldCategoryName);

  res.redirect('/');
}

async function deleteCategory(req, res) {
  categoryName = req.params.category_name;
  try {
    await db.deleteCategory(categoryName);
  }
  catch (error) {
    console.error(`Error deleting category '${categoryName}': `, error);
  }

  res.redirect('/');
}

async function createGame(req, res) {
  const gameData = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    rating: req.body.rating,
    releaseDate: req.body.release_date,
    categoryId: req.body.category_id
  };
  await db.createGame(gameData);

  res.redirect('/');
}

async function deleteGame(req, res) {
  const gameId = req.params.game_id;
  await db.deleteGame(gameId);

  res.redirect('/');
}

module.exports = {
  getAllCategoriesAndGames,
  getGamesOfSelectedCategory,
  createNewCategory,
  updateCategory,
  deleteCategory,
  createGame,
  deleteGame
};