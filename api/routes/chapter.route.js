const router = require('express').Router();
const constructor = require('../controllers/chapter.controller');
router.get('/', constructor.getAll)
    .post('/', constructor.create)
module.exports = router;