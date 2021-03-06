const { Router } = require('express');

const controller = require('./book-controller');

const router = new Router();

router.route('/')
  .get(controller.find);

router.route('/:id')
  .get(controller.findById);

router.param('id', controller.load);

module.exports = {
  router,
};
