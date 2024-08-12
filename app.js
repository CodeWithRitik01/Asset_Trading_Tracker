import "./env.js";

import express from "express";

import { connectDb } from "./dbConfig.js";

import userRoutes from "./routes/user.routes.js"
import assetRoutes from "./routes/assets.routes.js"
import userAssetRoutes from "./routes/userAsset.routes.js"
import requestRoutes from "./routes/requests.routes.js"

import cookieParser from "cookie-parser"

const PORT = process.env.PORT || 3000;
const mongoUrl = process.env.MONGOURL;

connectDb(mongoUrl);

const app = express();
app.use(cookieParser())
app.use(express.json());

app.use('/auth', userRoutes)
app.use('/assets', assetRoutes)
app.use('/', userAssetRoutes)
app.use('/requests', requestRoutes)

app.get("/", (req, res) =>{
    res.send("hello")
})


app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})