import express, { Express, RequestHandler } from 'express';
import bodyParser from 'body-parser';
import config from "config";
import cors from 'cors';
//import { deserializeUser } from "./middleware";
import { connection } from './db/connection';
import { Tables } from './db/Tables';
import { routerAuthor, routerbook, routerPermission, routerSession, userRouter } from './router';
import dotenv from "dotenv";

const app: Express = express();
const port = config.get("port") as number;
const host = config.get("host") as string;
dotenv.config();

app.use(cors());
app.use(bodyParser.json() as RequestHandler);
app.use(bodyParser.urlencoded({ extended: true }) as RequestHandler);
app.use(userRouter);
app.use(routerPermission);
app.use(routerSession);
app.use(routerAuthor);
app.use(routerbook);



app.listen(port, host, () => {
 console.log(`Server listing at http://${host}:${port}`);
  connection.connect((erro: any) => {
    if (erro) {
      console.log(erro);
    } else {
      console.log("conectado com sucesso");
      new
       Tables(connection);
    }
  });

});
