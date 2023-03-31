import { hash } from "bcrypt";
import { Request, Response } from "express";
import { IfilterData } from "../interface/App";
import User from "../models/User";

class UserController {
  public async findAllUserHandler(req: Request, res: Response) {
    console.log(req.query);
    try {
      const { limit, page, search } = req.query as unknown as IfilterData;
        const user = await User.findAll({page, limit, search});
        return res.send(user);
    } catch (e: any) {
      console.log(e);
      return res.status(409).send(e.message);
    }
  }

  public async getByIdHandler(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await User.findById(id);

      return res.send(user);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }
  
  public async getByEamailHandler(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await User.findByEmail(email);

      return res.send(user);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }
  public async addHandler(req: Request, res: Response) {
    try {
      const value = req.body;
      const passwordHashed = await hash(value.password, 8);
      value.password = passwordHashed;
      const user = await User.add(value);
      return res.send(user);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }
  public async updateHandler(req: Request, res: Response) {
    try {
      console.log(req.body);
      const id = parseInt(req.params.id);
      const value = req.body;
      const user = await User.update(id, value);
      return res.send(user);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }
  
  public async deleteHandler(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await User.delete(id);
      return res.send(user);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }
}

export default new UserController();
