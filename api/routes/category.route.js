const router = require('express').Router();
const controller = require('../controllers/category.controller');
router.get('/', controller.getAll)
    .post('/', controller.create)
router.get('/:id', controller.get)
    .delete('/:id', controller.delete)
router.get('/slug/:slug', controller.getBySlug)
module.exports = router;