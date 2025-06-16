const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories ORDER BY category ASC");
  return rows;
}

async function getSelectedCategoryId(categoryName) {
  const { rows } = await pool.query("SELECT id FROM categories WHERE category ILIKE $1", [categoryName]);
  return rows[0].id;
}

async function createNewCategory(categoryName) {
  await pool.query("INSERT INTO categories (category) VALUES ($1)", [categoryName]);
  return;
}

async function updateCategory(newCategoryName, oldCategoryName) {
  await pool.query("UPDATE categories SET category = $1 WHERE category ILIKE $2", [newCategoryName, oldCategoryName]);
  return;
}

async function deleteCategory(categoryId) {
  await pool.query("DELETE FROM categories WHERE category ILIKE $1", [categoryId]);
  return;
}

async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM games");
  return rows;
}

async function getGameById(gameId) {
  const { rows } = await pool.query("SELECT * FROM games WHERE id = $1", [gameId]);
  return rows[0];
}

async function getGamesOfSelectedCategory(categoryId) {
  const { rows } = await pool.query("SELECT * FROM games WHERE category_id = $1", [categoryId]);
  return rows;
}

async function createGame(gameData) {
  await pool.query("INSERT INTO games (title, description, price, rating, release_date, category_id) VALUES($1, $2, $3, $4, $5, $6)", [gameData.title, gameData.description, gameData.price, gameData.rating, gameData.releaseDate, gameData.categoryId]);
  return;
}

async function updateGame() {

}

async function deleteGame(gameId) {
  await pool.query("DELETE FROM games WHERE id = $1", [gameId]);
  return;
}

module.exports = {
  getAllCategories,
  getSelectedCategoryId,
  createNewCategory,
  updateCategory,
  deleteCategory,
  getAllGames,
  getGameById,
  getGamesOfSelectedCategory,
  createGame,
  updateGame,
  deleteGame
}