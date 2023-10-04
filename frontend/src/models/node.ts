export interface NodeType{
    _id:string,
    title:string,
    text:string,
    createdAt:string,
    updatedAt:string

}

export interface User{
    username:string,
    email:string
}

export interface MainPageReturnType{
   nodes: NodeType[],
   nodeLength:number

}