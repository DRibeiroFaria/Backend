import { NextFunction, Request, Response } from "express";
import { BaseUser, User } from "./user.interface";
import niv from 'node-input-validator'
import { execute } from "../../utils/mysql.connector";
import { UserQueries } from "./user.queries";
import HttpException from "../../common/http-exception";
import { HttpError, stringHelper } from "../../utils/strings";
import { errorHandler } from "../../middleware/error.middleware";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


export const signup = async (req: Request, res: Response, next : NextFunction) => {
  try {
    const user: BaseUser = req.body;

    const v = new niv.Validator(user, {
      'username': 'required|string|maxLength:20',
      'email': 'uniqueEmail|required|email',
      'pass': 'required|string|minLength:8'
    })

    niv.extend('uniqueEmail', async ( email:any) => {
        return !((await execute<User[]>(UserQueries.FindUser, [email.value])).length > 0)
    });

    niv.addCustomMessages({
      'email.uniqueEmail': `This email address is already being used`
    });

    const matched = await v.check()
    
    if (!matched) {
      return res.status(401).json(v.errors);
    }

    const hashedPassword = await bcrypt.hash(user.pass, 12);
    await execute<{ affectedRows: number }>(UserQueries.AddUser, [user.username, user.email, hashedPassword, new Date(), new Date()]);
    
    res.status(201).json();
  
  } catch (error : any) {
      throw errorHandler(new HttpException(500, HttpError.http500, error), req, res, next)  
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {

  try {

    const user: BaseUser = req.body;

    const v = new niv.Validator(user, {
      'email': 'required',
      'pass': 'required'
    })

    const matched = await v.check()

    if (!matched) {
      return res.status(422).send(v.errors)
    }

    const storedUser = await execute<User[]>(UserQueries.FindUser, [user.email])

    if (storedUser.length !== 1) {
      return res.status(401).send(stringHelper.userNotFound)
    }

    const isEqual = await bcrypt.compare(user.pass, storedUser[0].pass);

    if (!isEqual) {
      return res.status(401).send(stringHelper.wrongPassword)
    }

    const token = jwt.sign(
      {
        email: storedUser[0].email,
        userId: storedUser[0].id,
      },
      stringHelper.jwtSecret,
      { expiresIn: stringHelper.expiresIn }
    );

    res.status(200).json({ token: token, userId: storedUser[0].id });
 
  } catch (error:any) {
      throw errorHandler(new HttpException(500, HttpError.http500, error), req, res, next)   
  }
};

