const router = require("express").Router();
const asyncWrap = require("express-async-wrap");
const userMiddleware = require("../../middlewares/user_middleware");
const jwt = require("../../middlewares/jwt_middleware");

router.post("/users", asyncWrap(userMiddleware.registerNewUser));

router.post("/users/login", userMiddleware.login);

router.get("/user", jwt.required, asyncWrap(userMiddleware.getCurrentUser));

module.exports = router;
