import express from "express";
import bodyParser from "body-parser";
import { router as cat } from "./api/cat";


export const app = express();
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use("/", cat);