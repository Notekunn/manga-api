const router = require('express').Router();
const controller = require('../controllers/manga.controller');
const checkAuth = require('../middlewares/check-auth');
router.get('/', controller.getAll)
    .post('/', checkAuth, controller.create)
module.exports = router;