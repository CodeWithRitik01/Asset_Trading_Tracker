import express from "express"
import { createAsset, createRequest, getAsset, listOnMarketplace, updateAsset } from "../controlers/assets.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

app.use(isAuthenticated);

app.post('/', createAsset);
//pass asset id in each one of them
app.post("/:id", updateAsset)
app.put("/:id/publish", listOnMarketplace)
app.get("/:id", getAsset)
app.post("/:id/request", createRequest)

export default app