const router = require('express').Router();
const controller = require('../controllers/user.controller');

router.get("/", controller.getAll)
    .post("/", controller.create)
router.get("/:id", controller.get)
    .delete("/:id", controller.delete)
    .patch("/:id", controller.patch)

module.exports = router;