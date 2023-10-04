import "dotenv/config"

import express from 'express'
import {Request, Response, NextFunction} from "express"
import morgan from "morgan"
import createHttpError ,{isHttpError} from "http-errors"
import cors from 'cors'

import nodeRoutes from  "./routes/nodeRoute"
import userRoutes from  "./routes/userRoutes"
import session from "express-session"
import env from "./util/validateEnv"
import MongoStore from "connect-mongo"
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser"
import { requireAuth } from "./middleware/auth"
import path from 'path'

// import MongoDBStore from "connect-mongodb-session";  /// when cookie is not formaed 


// const mongoStore = MongoDBStore(session);

// const store = new mongoStore({
//   collection: "userSessions",
//   uri: env.MONGO_CONNECTION_STIRNG,
//   expires: 60*60*1000,
// });

// store.on('error', function(error) {
//     console.log(error);
//   });

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(morgan("dev"))
app.use(express.json())
app.use(cors(
 {   origin: true,
    credentials: true,}
   
    // {
    //     origin: 'http://localhost:3000',
    //     methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    //     credentials: true
    //   }

))
// app.use(cors({credentials: true, origin: "*"}));
// app.set("trust proxy", 1);
// app.use(session({
//     secret:env.SESSION_SECRET,
 
//     resave:false,
//     saveUninitialized:false,
//     proxy: true,
//     cookie:{
//         // sameSite: 'none',
//         secure: true,  
//         maxAge:60*60*1000,
//         // path    : '/',
//     }, 
 
//     rolling:true,
//     // store: store,
//     store:MongoStore.create({
//         mongoUrl:env.MONGO_CONNECTION_STIRNG
//     })
// }))
// app.set('trust proxy', 1)
app.use(session({
    secret: env.SESSION_SECRET,
    // secret:"ddddddddddd",
    resave: false,
    saveUninitialized: false,
    // name: 'MyCoolWebAppCookieName',
    cookie: {
        // secure:true,
        // path:"/",
        // path: '/',
        // httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 48, sameSite: 'none',
        // httpOnly: true,
        secure: false,

        maxAge: 60 * 60 * 1000,
        // sameSite:"lax"
        // secure: true, sameSite: "none" 
        // httpOnly:true,
        // sameSite:false,
        // secure:true,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STIRNG,
        // collectionName: "sessions", ttl: 100, autoRemove: "native"
        // dbName:"cool_nodes_app",
        // ttl:14*24*60*60,
        // autoRemove:"native",

        // collectionName: "sessions",
        // stringify: false,
        // autoRemove: "interval",
        // autoRemoveInterval: 1
    }),
}));


// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
//   });

// app.all('*', function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'URLs to trust of allow');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     if ('OPTIONS' == req.method) {
//     res.sendStatus(200);
//     } else {
//       next();
//     }
//   });
// app.use(function(req, res, next) {  
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });  

app.use("/api/routes/users", userRoutes)
app.use("/api/routes",requireAuth,  nodeRoutes)









// app.use(express.static(path.join(__dirname, "../../frontend/build")))
// app.get("*", (req, res)=>{
//     res.sendFile(path.resolve(__dirname, "../../frontend/build/index.html"))
// })



app.use((req, res, next)=>{
    next(createHttpError(  404, "End point not found"))

})


// set a cookie
// app.use(function (req, res, next) {
//     // check if client sent cookie
//     // var cookie = req.cookies.connect.sid;
//     var cookie = undefined

//     if (cookie === undefined) {
//       // no: set a new cookie
//       var randomNumber=Math.random().toString();
//       randomNumber=randomNumber.substring(2,randomNumber.length);
//       res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
//       console.log('cookie created successfully');
//     } else {
//       // yes, cookie was already present 
//       console.log('cookie exists', cookie);
//     } 
//     next(); // <-- important!
//   });






app.use((error:unknown,req:Request, res:Response, next:NextFunction)  =>{
    console.error(error)
    let errorMessage = "an unkown error occured"
    let statusCode = 500
    // if(error instanceof Error) errorMessage = error.message
    if(isHttpError(error)){
        statusCode = error.status
        errorMessage = error.message
    } 
    res.status(statusCode).json({
        error:errorMessage
    })
})

export default app 

