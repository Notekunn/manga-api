const router = require('express').Router();
const controller = require('../controllers/manga.controller');
router.get('/', controller.getAll)
    .post('/', controller.create)
module.exports = router;