import { InferSchemaType, Schema, model } from "mongoose";

const nodeSchema = new Schema({
    userId:{type:Schema.Types.ObjectId, required:true,ref:"UserModel"},
    title:{type:String, required:true},
    text:{type:String},
   

}, {timestamps:true})
type Node = InferSchemaType<typeof nodeSchema>

export default model<Node>("Node", nodeSchema)