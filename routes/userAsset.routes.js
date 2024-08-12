import express from "express"
import {getAllRequests, getMarketAssets, getUserAssets} from "../controlers/userAsset.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

app.use(isAuthenticated);

//pass user id here
app.get("/users/:id/assets", getUserAssets)

app.get("/marketplace/assets", getMarketAssets)

//pass user id here
app.get("/users/:id/requests", getAllRequests)

export default app