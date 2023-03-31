import { Request, Response } from "express";
import { IfilterData } from "../interface/App";
import Permission from "../models/Permission";

class PermissionController {
  public async findAllPermissionHandler(req: Request, res: Response) {
    try {
      const { limit, page } = req.query as unknown as IfilterData;
        const permission = await Permission.findAll({page, limit});
        return res.send(permission);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }

  public async getByIdHandler(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const permission = await Permission.findById(id);

      return res.send(permission);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }
  
  public async addHandler(req: Request, res: Response) {
    try {
      const value = req.body;
      const permission = await Permission.add(value);
      return res.send(permission);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }
  public async updateHandler(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const value = req.body;
      const permission = await Permission.update(id, value);
      return res.send(permission);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }
  
  public async deleteHandler(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const permission = await Permission.delete(id);
      return res.send(permission);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }
}

export default new PermissionController();
