const router = require('express').Router();
const controller = require('../controllers/artist.controller');
router.get('/', controller.getAll)
    .post('/', controller.create)
router.get('/:id', controller.get)
    .delete('/:id', controller.delete)
module.exports = router;