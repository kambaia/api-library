import { Router } from "express";
import permissionController from "../controller/permission.controller";

 export  const routerPermission = Router();
  routerPermission.get("/api/permissions", permissionController.findAllPermissionHandler);
  routerPermission.get("/api/permission/:id", permissionController.getByIdHandler);
  routerPermission.post("/api/permission", permissionController.addHandler);
  routerPermission.put("/api/permission/:id", permissionController.updateHandler);
  routerPermission.delete("/api/permission/:id", permissionController.deleteHandler);

