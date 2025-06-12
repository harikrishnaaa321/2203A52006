import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import {getNumbers} from "./controllers/number.controller.js";
dotenv.config();
const app=express();
const PORT=9876;
app.use(express.json());
app.use(cookieParser());
app.get("/numbers/:number_id", getNumbers);
app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`);
});
