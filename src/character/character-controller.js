const only = require('only');

const db = require('../db');

let index = db.characters
  .reduce((maxId, character) => (character.id > maxId ? character.id : maxId), 0);
const extend = Object.assign;

async function load(req, res, next, id) {
  try {
    const character = db.characters.find(c => c.id === +id);
    if (!character) {
      return next({ status: 404, message: `Character "${id}" not found` });
    }
    req.params.character = character;
    return next();
  } catch (error) {
    return next(error);
  }
}

async function find(req, res) {
  return res.json(db.characters);
}

async function findById(req, res) {
  const { character } = req.params;
  return res.json(character);
}

function validate(character) {
  if (typeof character.name !== 'string') {
    throw new TypeError('Character#name must be a string');
  }
  if (typeof character.isFemale !== 'boolean') {
    throw new TypeError('Character#isFemale must be a boolean');
  }
  if (character.house && typeof character.house !== 'number') {
    throw new TypeError('Character#house must be a number');
  }
  if (!db.houses.some(h => h.id === character.house)) {
    throw new ReferenceError('Character#house does not refer to an existing house');
  }
  if (!Array.isArray(character.books)) {
    throw new TypeError('Character#books must be an Array');
  }
  if (!character.books.every(book => db.books.some(b => b.id === book))) {
    throw new ReferenceError('Character#books do not refer to existing books');
  }
}

async function create(req, res, next) {
  const character = only(req.body, 'name isFemale house books');
  try {
    validate(character);
    db.characters = [
      ...db.characters,
      extend({ id: index += 1 }, character),
    ];
    return res.location(`/api/v1/customers/${index}`).sendStatus(201);
  } catch (error) {
    return next({ status: 422, message: error.message });
  }
}

async function update(req, res, next) {
  const character = extend({}, req.params.character, only(req.body, 'name isFemale house books'));
  try {
    validate(character);
    db.characters = db.characters.map(c => (c.id === character.id ? character : c));
    return res.sendStatus(204);
  } catch (error) {
    return next({ status: 422, message: error.message });
  }
}

async function remove(req, res) {
  const { character } = req.params;
  db.characters = db.characters.filter(c => c.id !== character.id);
  return res.sendStatus(204);
}

module.exports = {
  load,
  find,
  findById,
  create,
  update,
  remove,
};
