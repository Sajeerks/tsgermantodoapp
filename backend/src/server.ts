
import app from "./app"
import env from "./util/validateEnv"
import mongoose from "mongoose"



const port =env.PORT 



mongoose.connect(env.MONGO_CONNECTION_STIRNG! ).then((res)=>{
    console.log("mogoose is coneecte to databse")
    // console.log(res.Connection)
    app.listen(port!, ()=>{
        console.log(`server is runnning in : $${port}`)
    })
}).catch(console.error)

