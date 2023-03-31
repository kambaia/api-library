import { Request, Response } from "express";
import { IfilterData } from "../interface/App";
import Author from "../models/Author";

class UserController { 
  public async findAllAuthorHandler(req: Request, res: Response) {
    try {
      const { limit, page } = req.query as unknown as IfilterData;
        const user = await Author.findAll({page, limit});
        return res.send(user);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }

  public async getByIdHandler(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await Author.findById(id);

      return res.send(user);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }
  
  public async getByEamailHandler(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await Author.findByEmail(email);

      return res.send(user);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }
  public async addAuthorHandler(req: Request, res: Response) {
    try {
      const value = req.body;
      console.log(value);
      const user = await Author.add(value);
      return res.send(user);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }
  public async updateAuthorHandler(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const value = req.body;
      const user = await Author.update(id, value);
      return res.send(user);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }
  
  public async deleteHandler(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await Author.delete(id);
      return res.send(user);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }
}

export default new UserController();
