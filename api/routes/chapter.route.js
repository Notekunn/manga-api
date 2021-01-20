const router = require('express').Router();
const constructor = require('../controllers/chapter.controller');
const checkAuth = require('../middlewares/check-auth');
router.get('/', constructor.getAll)
    .post('/', checkAuth, constructor.create)
module.exports = router;