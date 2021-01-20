const router = require('express').Router();
const controller = require('../controllers/user.controller');
const checkAuth = require('../middlewares/check-auth');

router.get("/", controller.getAll)
    .post("/", controller.create)
router.get("/:id", controller.get)
    .delete("/:id", checkAuth, controller.delete)
    .patch("/:id", checkAuth, controller.patch)
router.post("/login", controller.signIn)
module.exports = router;