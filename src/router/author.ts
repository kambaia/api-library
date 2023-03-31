import { Router } from "express";
import authorController from "../controller/author.controller";

 export  const routerAuthor = Router();
  routerAuthor.get("/api/authors", authorController.findAllAuthorHandler);
  routerAuthor.get("/api/author/:id", authorController.getByIdHandler);
  routerAuthor.post("/api/author-email/", authorController.getByEamailHandler);
  routerAuthor.post("/api/author", authorController.addAuthorHandler);
  routerAuthor.put("/api/author/:id", authorController.updateAuthorHandler);
  routerAuthor.delete("/api/author/:id", authorController.deleteHandler);

