import express from "express";
const router = express.Router();

import * as TasksController from "../app/controllers/TasksController.js";
import * as UsersController from "../app/controllers/UsersController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";

//TasksController
router.post("/CreateTask", TasksController.CreateTask);
router.put("/UpdateTask", TasksController.UpdateTask);
router.get("/TaskList", TasksController.TaskList);
router.delete("/DeleteTask", TasksController.DeleteTask);
router.get("/CountTask", TasksController.CountTask);

//UsersController
router.post("/Registration", UsersController.Registration);
router.post("/Login", UsersController.Login);
router.get("/ProfileDetails", AuthMiddleware, UsersController.ProfileDetails);
router.put("/ProfileUpdate", AuthMiddleware, UsersController.ProfileUpdate);
router.post("/EmailVerify/:email", UsersController.EmailVerify);
router.post("/OTPVerify", UsersController.OTPVerify);
router.post("/ForgotPassword", UsersController.ForgotPassword);

export default router;
