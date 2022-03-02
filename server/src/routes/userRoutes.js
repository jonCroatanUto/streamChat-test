const Router = require("express").Router;
const userRouter = Router();
const { usersController } = require("../controllers");

userRouter.get("/", usersController.getUser);
userRouter.post("/signup", usersController.createNewUser);
userRouter.post("/signin", usersController.login);

module.exports = userRouter;
