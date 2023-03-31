import { Request, Response, NextFunction } from "express";
import { sign, verify } from "jsonwebtoken";


const secret = "1504134bca8795e25b8d8e649ca465707bfc18c4414a2ff8a46c7a5a63359260"


export const createToken = (id: string)=>{
  console.log("token", secret)
return sign({ id}, secret,{ expiresIn: '1h'})
} 

export const securetyUser = (request: Request, response: Response, next: NextFunction) => {
    const authToken = request.headers.authorization;
    if (!authToken) {
        return response.status(401).json({ message: "Token is missing" });
    }

    const [, token] = authToken.split(" ");
    try {
        verify(token, process.env.KEY_AUTH!);
        return next();

    } catch (error) {
        return response.status(401).json({ message: "Token invalid" });
    }
}