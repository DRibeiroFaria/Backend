import { Request, Response, NextFunction } from "express"
import HttpException from "../common/http-exception";
import { HttpError, stringHelper } from "../utils/strings";
import { errorHandler } from "./error.middleware";
const jwt = require("jsonwebtoken")

export = async (req : Request, res : Response, next: NextFunction) => {
 
 const authHeader = req.get("Authorization");
 
 if(!authHeader){
   return res.status(401).json({"error":HttpError.http401})
 }

 const token = authHeader.split(' ')[1];
 let decToken;

 try{
    decToken = await jwt.verify(token, stringHelper.jwtSecret)
 }catch(error : any){
    throw errorHandler(new HttpException(500, HttpError.http500, error), req, res, next)
 }

 if (!decToken) {
    return res.status(401).json({"error":HttpError.http401})
 }

next();

}
