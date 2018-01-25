const router = require("express").Router();
const asyncWrap = require("express-async-wrap");
const userMiddleware = require("../../middlewares/user_middleware");

router.post("/users", asyncWrap(userMiddleware.registerNewUser));

module.exports = router;
