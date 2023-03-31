import { Router } from "express";
import userController from "../controller/user.controller";
import { securetyUser } from "../utils/jwt.utils";
  export const userRouter = Router();

  userRouter.get("/api/users", securetyUser,  userController.findAllUserHandler);
  userRouter.get("/api/user/:id", userController.getByIdHandler);
  userRouter.post("/api/user-email/", userController.getByEamailHandler);
  userRouter.post("/api/user", userController.addHandler);
  userRouter.put("/api/user/:id", userController.updateHandler)
  userRouter.delete("/api/user/:id", userController.deleteHandler);

