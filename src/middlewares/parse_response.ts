import { NextFunction,Request,Response } from "express";

type ApiResponse = {
    type:string;
    status_code:number;
    message:string;
    result:any;
}

const parseResponse = (statusCode:number, message:string, result:any):ApiResponse => {
    const type = statusCode >= 200 && statusCode < 300 ? "success" : "error";
    const status_code = statusCode;
  
    return { type, status_code, message, result };
  };
  
  
export const formatResponse = (req:Request, res:Response, next:NextFunction):void => {
    res.apiSuccess = (message:string, result:any,statusCode=200) => {
        const successResponse = parseResponse(statusCode, message, result);
        res.status(200).json(successResponse);
    };
  
    res.apiError = (message:string,statusCode:number=500,result:any=null) => {
        const errorResponse = parseResponse(statusCode, message, result);
        res.status(statusCode).json(errorResponse);
    };
  
    next();
  };