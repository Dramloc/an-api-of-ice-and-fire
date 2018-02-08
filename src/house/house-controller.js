const db = require('../db');

async function load(req, res, next, id) {
  try {
    const house = db.houses.find(b => b.id === +id);
    if (!house) {
      return next({ status: 404, message: `House "${id}" not found` });
    }
    req.params.house = house;
    return next();
  } catch (error) {
    return next(error);
  }
}

async function find(req, res) {
  return res.json(db.houses);
}

async function findById(req, res) {
  const { house } = req.params;
  return res.json(house);
}

module.exports = {
  load,
  find,
  findById,
};
