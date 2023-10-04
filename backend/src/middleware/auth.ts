import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requireAuth:RequestHandler=(req, res, next)=>{
    console.log("in rquiresusth middelware==",req.session.userId)
    if(req.session.userId){
        next()
    }else{
        next(createHttpError(401,"user not authenticated"))
    }
}