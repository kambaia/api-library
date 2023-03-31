import { Request, Response } from "express";
import { IfilterData } from "../interface/App";
import Book from "../models/Book";

class BookController { 
  public async findAllBookHandler(req: Request, res: Response) {
    try {
      const { limit, page } = req.query as unknown as IfilterData;
        const user = await Book.findAll({page, limit});
        return res.send(user);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }

  public async getByIdHandler(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await Book.findById(id);

      return res.send(user);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }
  
  public async getByEamailHandler(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await Book.findByEmail(email);

      return res.send(user);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }
  public async addBookHandler(req: Request, res: Response) {
    try {
      const value = req.body;
      console.log(value);
      const user = await Book.add(value);
      return res.send(user);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }
  public async updateBookHandler(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const value = req.body;
      const user = await Book.update(id, value);
      return res.send(user);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }
  
  public async deleteHandler(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await Book.delete(id);
      return res.send(user);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }
}

export default new BookController();
