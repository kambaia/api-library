import { Response } from "express";
import { MysqlError } from "mysql";
import { connection } from "../db/connection";
import { IAuthLogin, IfilterData } from "../interface/App";
import { IAuthor } from "../interface/AuthorInterface";
import { IUser } from "../interface/UserInterface";

class AuthModel {
  auth({  email, password }: IAuthLogin): Promise<IUser | string> {
    return new Promise(async function (resolve, reject) {
      console.log(email, password)
      const sql = `SELECT u.email, u.password, u.active,u.lastName,u.id,u.userName,u.userProfile, p.role, p.type FROM tb_users as u join tb_permissions as p on u.permissionId= p.id where email='${email}'`;
      connection.query(sql, (err: MysqlError, result: IUser[]) => {
        console.log(err);
        if (err) reject(err.message);
        resolve(result[0]);
      });
    });
  }
}

export default new AuthModel();
