const router = require('express').Router();
const controller = require('../controllers/artist.controller');
const checkAuth = require('../middlewares/check-auth');
router.get('/', controller.getAll)
    .post('/', checkAuth, controller.create)
router.get('/:id', controller.get)
    .delete('/:id', checkAuth, controller.delete)
module.exports = router;