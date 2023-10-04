import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import userModel from '../models/userModel';
import bcrypt from 'bcrypt'



export const logout :RequestHandler= async(req, res,next)=>{
    req.session.destroy(error=>{
        if(error){
            next(error)
        }else{
            res.sendStatus(200)
        }
    })
}


// export const sample :RequestHandler= async(req, res,next)=>{
//   res.status(200).json({
//     message:"all i sworking fine"
//   })
// }




export const getAuthenticatedUser:RequestHandler<unknown, unknown, unknown, unknown> =async(req, res, next)=>{



  await console.log(req.session.userId)
  console.log("req.sesssopm"+req.session)
  const authenticateduser = req.session.userId
  console.log(authenticateduser)
  req.session.save();
try {
const authenticateduser =await req.session.userId
console.log(req.session)
console.log(authenticateduser)
    if(!authenticateduser){
        throw createHttpError(401, "user not autheicated req.session")
    }
const user = await userModel.findById(authenticateduser).select("+email").exec()

res.status(200).json(user)


    
} catch (error) {
    next(error)
}


}











interface SignUpBody{
    username?:string, 
    email?:string, 
    password?:string

}
export const signUp :RequestHandler<unknown, unknown, SignUpBody, unknown> =async(req, res, next)=>{
    const username = req.body.username
    const email = req.body.email

    const passwordNew = req.body.password

    try {
        
   if(!username || !email || !passwordNew){
    throw createHttpError(400 , "paramaeters missing")
   }
   const existingUserName = await userModel.findOne({username:username}).exec()
   if(existingUserName){
    throw createHttpError(409, "username already taken please use another usernam")
   }
   const existingEmail = await userModel.findOne({email:email}).exec()
   if(existingEmail){
    throw createHttpError(409, "email already taken please use another email")
   }


   const passwordHasded = await bcrypt.hash(passwordNew, 10)
   const newUser = await userModel.create({
    username:username,
    email:email,
    password:passwordHasded 

   })
   req.session.userId = newUser._id

res.status(201).json(newUser)

    } catch (error) {
        next(error)
    }



}
interface LoginBody{
username?:string,
password?:string
}
export const login:RequestHandler<unknown,  unknown, LoginBody, unknown> =async(req, res, next)=>{
    const username = req.body.username
    const password = req.body.password
  try {
      if(!username || !password){
        throw createHttpError(400," parametere unknow")
      }

      const user = await userModel.findOne({username:username}).select("+password +email").exec()
      if(!user){
        throw createHttpError(401 , "invalid crednetials")

      }


      const passwordMatch = await bcrypt.compare(password, user.password)
      if(!passwordMatch){
        throw createHttpError(401 , "invalid crednetials")

      }
        console.log("fopund user in login")
      req.session.userId = user._id
      console.log("req.session.userId ==="+req.session.userId)
await req.session.save((err)=>{
  if(err){
    console.log("errr in save req.session==", err)
     
  }else{
    console.log("session has been stored withID==" , req.session.userId)

  }

})
res.cookie('cookieName', 'sssssssssssssssssssssssssss')


// req.session.save((err) => console.log(err));
      res.status(200).json(user)

  } catch (error) {
    next(error)
  }

}

