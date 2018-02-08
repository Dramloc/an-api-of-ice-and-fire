const { Router } = require('express');

const controller = require('./character-controller');

const router = new Router();

router.route('/')
  .get(controller.find)
  .post(controller.create);

router.route('/:id')
  .get(controller.findById)
  .put(controller.update)
  .delete(controller.remove);

router.param('id', controller.load);

module.exports = {
  router,
};
