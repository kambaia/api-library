import { compare } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { IAuthLogin, IfilterData } from "../interface/App";
import { IUser, IUserLOgin } from "../interface/UserInterface";
import AuthLogin from "../models/Auth";
import { createToken } from "../utils/jwt.utils";

class authController {
  public async AuthHandler(req: Request, res: Response) {
    try {
      const { email, password } = req.body as IAuthLogin;
      const user = (await AuthLogin.auth({ email, password })) as IUserLOgin;

      if (!user)
        return res
          .status(404)
          .send({ error: "Username or password not found" });
      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        return res.status(404).send({ error: "User or Password incorrect" });
      }
      const {
        email: newEmail,
        active,
        fullName,
        id,
        permission,
        userName,
        userProfile,
        role,
        type,
      } = user;
      const token = createToken(id.toString());

      return res.send({
        user: {
          email: newEmail,
          id,
          active,
          fullName,
          permission,
          userName,
          userProfile,
          role,
          type,
        },
        token,
      });
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }
}

export default new authController();
