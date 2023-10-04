import { RequestHandler, json } from "express";
import NodeModel from "../models/node";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/asserDefined";

export const getNodes: RequestHandler = async (req, res, next) => {
  const authenticatedUser = req.session.userId
  const pageNumber = Number(req.params.pageNumber)
  const skipper:number = pageNumber>1?(3 *(pageNumber-1)):0
 console.log("pageNumber==",pageNumber)
 console.log("sjipper==", skipper)
  try {
    // throw  Error("this is sa new error")
    // throw createHttpError(401)
    assertIsDefined(authenticatedUser)
    const nodes1 = await NodeModel.find({userId:authenticatedUser})

const nodes = await NodeModel.find({userId:authenticatedUser}).sort({_id:-1}).limit(3).skip(skipper).exec()
    // const nodes = await NodeModel.find().sort({_id:-1}).exec();

    
 if(!nodes){

  throw createHttpError(404, "nodes not found")
 }
 const nodeLength =nodes1.length
 console.log("nodeLength", nodeLength)
    res.status(200).json({
      nodes,
      // message: "this is woring",
      nodeLength
    });
  } catch (error) {
    next(error);
  }
};

interface CreateNodeBody{
    title:string,
    text?:string
}
export const createNode: RequestHandler<unknown,unknown, CreateNodeBody, unknown> = async (req, res, next) => {
    const title = req.body.title
    const text = req.body.text
    const authenticatedUser = req.session.userId
    console.log("authenicatesuser in crate node==",authenticatedUser)
    console.log({authenticatedUser})
    try {
    assertIsDefined(authenticatedUser)

   if(!title){
    throw createHttpError(400, "note must have a title")
   }

    const newNode  = await NodeModel.create({
        title,
        text, 
        userId:authenticatedUser
    })

    if(!newNode){
        throw  Error("new node not reated")
    }
  res.status(201).json({
    newNode, 
    messaage:"new node is created"
  })
   
    } catch (error) {
      next(error);
    }
  };
  


  export const getSingleNode: RequestHandler = async (req, res, next) => {
    const authenticatedUser = req.session.userId

    try {
      assertIsDefined(authenticatedUser)
 
   if(!mongoose.isValidObjectId(req.params.id)){
    
    throw  createHttpError(404, " thd ID u r looking for is not valid ID ")

   }

    const Node  = await NodeModel.findById(req.params.id).exec()

    if(!Node){
        throw  createHttpError(404, " the nose u r lookign for is not found")
    }
    if(!Node.userId.equals(authenticatedUser)){  
       throw createHttpError(401, "you cannot access this note ")
    }
  res.status(201).json({
    Node, 
    messaage:"found the node that u are looking for"
  })
   
    } catch (error) {
      next(error);
    }
  };
  

  interface UpdateNodeType{
    title:string,
    text?:string
}

interface UpdateNodeParams{
  noteId:string
}
  
  export const updateNode: RequestHandler<UpdateNodeParams,unknown, UpdateNodeType, unknown>  = async (req, res, next) => {
    const authenticatedUser = req.session.userId


const noteId = req.params.noteId
const newTitle = req.body.title
const newText = req.body.text

    try {
      assertIsDefined(authenticatedUser)
 
   if(!mongoose.isValidObjectId(noteId)){
    
    throw  createHttpError(404, " thd ID u r looking for is not valid ID ")

   }


   if(!newTitle){
    throw createHttpError(404, "need new title to complete this operaton UPDATE")
   }

    const Node  = await NodeModel.findById(noteId).exec()

    if(!Node){
        throw  createHttpError(404, " the nose u r lookign for is not found")
    }
    if(!Node.userId.equals(authenticatedUser)){  
      throw createHttpError(401, "you cannot access this note ")
   }

    Node.title = newTitle
    Node.text = newText

    const udpateNode = await Node.save()

  res.status(200).json({
    updatedNote:udpateNode, 
    messaage:"  the node is successuflly updated"
  })
   
    } catch (error) {
      next(error);
    }
  };
  



    
  export const deleteSingleNode: RequestHandler<UpdateNodeParams,unknown, unknown, unknown>  = async (req, res, next) => {

    const authenticatedUser = req.session.userId

    const noteId = req.params.noteId

    
        try {
          assertIsDefined(authenticatedUser)
     
       if(!mongoose.isValidObjectId(noteId)){
        
        throw  createHttpError(404, " thd ID u r looking for is not valid ID ")
    
       }
   
    
        const Node  = await NodeModel.findById(noteId).exec()
    
        if(!Node){
            throw  createHttpError(404, " the nose u r lookign for is not found")
        }
    
        if(!Node.userId.equals(authenticatedUser)){  
          throw createHttpError(401, "you cannot access this note ")
       }






     await NodeModel.findByIdAndDelete(noteId).exec()
           
    
      res.sendStatus(204)
       
        } catch (error) {
          next(error);
        }
      };
      