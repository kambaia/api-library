import { MysqlError } from "mysql";
import { connection } from "../db/connection";
import { IfilterData } from "../interface/App";
import { IUser } from "../interface/UserInterface";

class PermissionsModel {
  findAll({ page = 0, limit = 1 }: IfilterData): Promise<IUser[] | string> {
    return new Promise(async function (resolve, reject) {
      const sql =
        limit && page
          ? `SELECT * FROM tb_permissions ORDER BY id LIMIT ${limit} OFFSET ${page};`
          : `SELECT * FROM tb_permissions`;
      console.log(sql);
      connection.query(sql, (err: MysqlError, result: IUser[]) => {
        if (err) reject(err.message);
        resolve(result);
      });
    });
  }

  findById(id: number) {
    return new Promise(async function (resolve, reject) {
      const sql = `SELECT * FROM tb_permissions WHERE id=${id}`;
      connection.query(sql, (err: MysqlError, result: IUser[]) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  }

  findByEmail(email: string) {
    return new Promise(async function (resolve, reject) {
      const sql = `SELECT * FROM tb_permissions WHERE email='${email}'`;
      connection.query(sql, (err: MysqlError, result: IUser[]) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  }

  add(user: IUser) {
    const sql = "INSERT INTO tb_permissions SET ?";
    return new Promise(async function (resolve, reject) {
      connection.query(sql, user, (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  }

  update(id: Number, values: any) {
    const sql = "UPDATE tb_permissions SET ? WHERE id=?";
    return new Promise(async function (resolve, reject) {
      connection.query(sql, [values, id], (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve({ ...values, id, result });
        }
      });
    });
  }

  delete(id: number) {
    const sql = "DELETE FROM tb_permissions WHERE id=?";
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
export default new PermissionsModel();
