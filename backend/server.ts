// import express, { Request, Response } from "express";

// const app = express();
// const PORT: number | string = process.env.PORT || 5000;

// // Middleware to parse JSON requests (optional but common)
// app.use(express.json());

// app.get("/", (req: Request, res: Response) => {
//   res.send("Backend is running!");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on porttttt ${PORT}`);
// });
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/db/index";
import { app } from "./app";
connectDB().then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
console.log("server running too fastttttt",process.env.PORT )
    })
}).catch((error)=>{
    console.log("MONGOdb connect failed !!!", error)
})

