import { Router } from "express";
import bookController from "../controller/book.controller";

 export  const routerbook = Router();
  routerbook.get("/api/books", bookController.findAllBookHandler);
  routerbook.get("/api/book/:id", bookController.getByIdHandler);
  routerbook.post("/api/book-email/", bookController.getByEamailHandler);
  routerbook.post("/api/book", bookController.addBookHandler);
  routerbook.put("/api/book/:id", bookController.updateBookHandler);
  routerbook.delete("/api/book/:id", bookController.deleteHandler);

