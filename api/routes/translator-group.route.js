const router = require('express').Router();
const controller = require('../controllers/translator-group.controller');
const checkAuth = require('../middlewares/check-auth');
router.get('/', controller.getAll)
    .post('/', checkAuth, controller.create)
router.get('/:id', controller.get)
module.exports = router;