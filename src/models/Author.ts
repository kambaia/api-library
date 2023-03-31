import { Response } from "express";
import { MysqlError } from "mysql";
import { connection } from "../db/connection";
import { IfilterData } from "../interface/App";
import { IAuthor } from "../interface/AuthorInterface";

class AuthorModel {
  findAll({ page = 0, limit = 1 }: IfilterData): Promise<IAuthor[] | string> {
    return new Promise(async function (resolve, reject) {
      const sql =
        limit && page
          ? `SELECT * FROM tb_authors ORDER BY id LIMIT ${limit} OFFSET ${page};`
          : `SELECT * FROM tb_authors`;
      connection.query(sql, (err: MysqlError, result: IAuthor[]) => {
        if (err) reject(err.message);
        resolve(result);
      });
    });
  }

  findById(id: number) {
    return new Promise(async function (resolve, reject) {
      const sql = `SELECT * FROM tb_authors WHERE id=${id}`;
      connection.query(sql, (err: MysqlError, result: IAuthor[]) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  }

  findByEmail(email: string) {
    return new Promise(async function (resolve, reject) {
      const sql = `SELECT * FROM tb_authors WHERE email='${email}'`;
      connection.query(sql, (err: MysqlError, result: IAuthor[]) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  }

  add(user: IAuthor) {
    const sql = "INSERT INTO tb_authors SET ?";
    return new Promise(async function (resolve, reject) {
      connection.query(sql, user, (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  }

  update(id: Number, values: any) {
    const sql = "UPDATE tb_authors SET ? WHERE id=?";
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
    const sql = "DELETE FROM tb_authors WHERE id=?";
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
export default new AuthorModel();
