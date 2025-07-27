import express from "express";
const router = express.Router();

import * as TasksController from "../app/controllers/TasksController.js";
import * as UsersController from "../app/controllers/UsersController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";

//UsersController
router.post("/Registration", UsersController.Registration);
router.post("/Login", UsersController.Login);
router.get("/ProfileDetails", AuthMiddleware, UsersController.ProfileDetails);
router.put("/ProfileUpdate", AuthMiddleware, UsersController.ProfileUpdate);
router.post("/EmailVerify/:email", UsersController.EmailVerify);
router.post("/OTPVerify", UsersController.OTPVerify);
router.post("/ForgotPassword", UsersController.ForgotPassword);

//TasksController
router.post("/CreateTask", AuthMiddleware, TasksController.CreateTask);
router.put("/UpdateTask/:id", AuthMiddleware, TasksController.UpdateTask);
router.get("/TaskList/:status", AuthMiddleware, TasksController.TaskList);
router.delete("/DeleteTask/:id", AuthMiddleware, TasksController.DeleteTask);
router.get("/CountTask", AuthMiddleware, TasksController.CountTask);

export default router;
