const router = require('express').Router();
const controller = require('../controllers/translator-group.controller')
router.get('/', controller.getAll)
    .post('/', controller.create)
router.get('/:id', controller.get)
module.exports = router;