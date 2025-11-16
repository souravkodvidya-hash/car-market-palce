import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import dotenv from "dotenv";

import authRoutes from "./src/routes/user.routes";
import { ApiError } from "./src/utils/ApiError";


dotenv.config();
const app = express();
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser())

//routes import 
// import userRouter from "./routes/user.routes.js";

// //routes declaration 

// app.use("/api/v1/users",userRouter)
app.use("/api/auth", authRoutes);

// Global error handler
app.use((err: ApiError, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  res
    .status(err.statusCode || 500)
    .json({ success: false, message: err.message, errors: err.errors || [] });
});





export {app}