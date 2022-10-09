import { execute } from "../../utils/mysql.connector";
import { UrlQueries } from "./url.queries";
import { BaseUrl, Url } from "./url.interface";
import { Request, Response, NextFunction } from "express";
import niv from 'node-input-validator'
import { stringHelper, urlRegex } from "../../utils/strings";
const jwt = require('jsonwebtoken');

export const deleteUrl = async (req: Request, res: Response, next : NextFunction) => {
  
  try {

    await execute<{affectedRows: number}>(UrlQueries.DeleteURLById, [req.params["id"]])
    res.status(200).send()
  
  } catch (error) {
  
    res.status(500).json({message: stringHelper.delete});
  
  }
}

export const getUrl = async (req: Request, res: Response) => {
 
  try {

    const url : any = await execute<string>(UrlQueries.GetURLByCode, [req.params["code"]]).then(() => {
        return execute<string>('SELECT @response', 0)
    });

    const responseUrl = url[0]["@response"]

    responseUrl ? res.redirect(301, responseUrl) : res.status(404).send();

  } catch (error) {

    res.status(500).json({message: stringHelper.fetchUrl});
  
  }
}

export const getAllUrl = async (req: Request, res: Response) => {
  
  const authHeader = req.get("Authorization");
  let userId : number = 0;

  try {

    if(authHeader){
        const token = authHeader.split(' ')[1];
        const decoded = await jwt.verify(token, stringHelper.jwtSecret);  
        userId = decoded.userId
      }

    const url : Url[] = await execute<Url[]>(UrlQueries.GetAllURL, [userId]);
   
    res.status(200).json({url});

  } catch (error) {

   res.status(500).json({message: stringHelper.fetchUrl});

  }
}

export const postUrl = async (req: Request, res: Response) => {
   
    const authHeader = req.get("Authorization");
    let userId : number | null = null;

    try {

      let url: BaseUrl = req.body;
      if(authHeader){
        const token = authHeader.split(' ')[1];
        const decoded = await jwt.verify(token, stringHelper.jwtSecret);  
        userId = decoded.userId
      }
    
    !urlRegex.test(url.long_url) ? url.long_url = stringHelper.http + url.long_url : url.long_url

    const data = queryParameters(url, process.env.HOST, userId)

    await execute<{ affectedRows: number }>(UrlQueries.AddURL, [data.short_url, data.code, data.long_url, data.userId, data.create, data.update]);
    
    res.status(201).json(data);

  } catch (e) {

    res.status(500).json({message: stringHelper.createUrl});

  }
}

export const putUrl = async (req: Request, res: Response, next : NextFunction) => {
  try {
    let url: BaseUrl = req.body;

    const v = new niv.Validator(url, {
      'url_code': 'uniqueCode|required|string|maxLength:10'
    })

    niv.extend('uniqueCode', async ( url_code:any) => {
        return !((await execute<Url[]>(UrlQueries.GetCode, [url_code.value])).length > 0)
    });

    niv.addCustomMessages({
      'url_code.uniqueCode': `This code is already being used`
    });

    const matched = await v.check()
    
    if (!matched) {
       res.status(401).send(v.errors)
       next()
    }

    await execute<{affectedRows: number}>(UrlQueries.UpdateUrl, [url.url_code, process.env.HOST + url.url_code, new Date(), [req.params["id"]]])

    res.status(201).send()
  
  } catch (error) {
  
    res.status(500).json({message: stringHelper.putUrl});
  
  }
}

export const queryParameters = (url: BaseUrl, host : string | undefined, userId : number | null ) => {
 
  let code = '';

  const characters = stringHelper.codeChar;
  const charactersLength = characters.length;
  
  for (var i = 0; i < 7; i++ ) {
      code += characters.charAt(Math.floor(Math.random() * charactersLength));
   }

  const queryParameters = {
    short_url: host + code, 
    code: code,
    long_url: url.long_url, 
    userId: userId, 
    create: new Date(), 
    update: new Date()
  }
    
  return queryParameters;
};
