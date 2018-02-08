const db = require('../db');

async function load(req, res, next, id) {
  try {
    const book = db.books.find(b => b.id === +id);
    if (!book) {
      return next({ status: 404, message: `Book "${id}" not found` });
    }
    req.params.book = book;
    return next();
  } catch (error) {
    return next(error);
  }
}

async function find(req, res) {
  return res.json(db.books);
}

async function findById(req, res) {
  const { book } = req.params;
  return res.json(book);
}

module.exports = {
  load,
  find,
  findById,
};
