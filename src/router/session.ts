import { Router } from "express";
import sessionController from "../controller/session.controller";

 export  const routerSession = Router();
 routerSession.post("/api/me", sessionController.AuthHandler);
  

