import { Response } from "express";
import { MysqlError } from "mysql";
import { connection } from "../db/connection";
import { IfilterData } from "../interface/App";
import { IUser } from "../interface/UserInterface";

class UserModel {
  findAll({ page = 0, limit = 1, search: text}: IfilterData): Promise<IUser[] | string> {
    console.log(text)
    return new Promise(async function (resolve, reject) {
      const sql =
        limit && page
          ? `SELECT us.id, us.userProfile, us.nameProfile, 
          us.phoneNumber, us.email, us.userName, us.firstName, us.lastName, us.active, us.permissionId, us.favoriteBookId, p.type, us.createdAt, us.updatedAt from tb_users as us
          JOIN tb_permissions as p ON us.permissionId = p.id WHERE us.userName LIKE '%${text}%' or us.firstName LIKE '%${text}%' or us.email LIKE '%${text}%' or p.type LIKE '%${text}%' LIMIT ${limit} OFFSET ${page};`
          : `SELECT us.id, us.userProfile, us.nameProfile, us.email, us.userName, us.firstName, us.lastName, p.livel, p.role, p.type,
          us.active, us.permissionId, us.favoriteBookId, us.createdAt, us.updatedAt from tb_users as us
          JOIN tb_permissions as p ON us.permissionId = p.id`;
      connection.query(sql, (err: MysqlError, result: IUser[]) => {
        if (err) reject(err.message);
        resolve(result);
      });
    });
  }

  findById(id: number) {
    return new Promise(async function (resolve, reject) {
      const sql = `SELECT * FROM tb_users WHERE id=${id}`;
      connection.query(sql, (err: MysqlError, result: IUser[]) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  }

  findByEmail(email: string) {
    return new Promise(async function (resolve, reject) {
      const sql = `SELECT * FROM tb_users WHERE email='${email}'`;
      connection.query(sql, (err: MysqlError, result: IUser[]) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  }

  add(user: IUser) {
    return new Promise(async function (resolve, reject) {
      const sql = `SELECT * FROM tb_users WHERE email='${user.email}'`;
      connection.query(sql, (err: MysqlError, result: IUser[]) => {
        if (err) reject(err);
        if (!result[0]) {
          const sql = "INSERT INTO tb_users SET ?";
          connection.query(sql, user, (err, result) => {
            if (err) reject(err);
            resolve(result[0]);
          });
        } else {
          reject({ message: "Username already exists." });
        }
      });
    });
  }

  update(id: Number, values: any) {
    const sql = "UPDATE tb_users SET ? WHERE id=?";
    console.log(id, values);
    return new Promise(async function (resolve, reject) {
      connection.query(sql, [values, id], (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          console.log(values)
          resolve({ ...values, id, result });
        }
      });
    });
  }

  delete(id: number) {
    const sql = "DELETE FROM Atendimentos WHERE id=?";
    return new Promise(async function (resolve, reject) {
      connection.query(sql, id, (erro, result) => {
        if (erro) {
          reject(erro);
        } else {
          resolve({ id, result });
        }
      });
    });
  }
}
export default new UserModel();
function findByEmail(email: string) {
  throw new Error("Function not implemented.");
}
