import express from "express"
import { isAuthenticated } from "../middlewares/auth.js";
import { acceptRequest, denyRequest, negotiatePrice } from "../controlers/requests.controller.js";

const app = express.Router();

app.use(isAuthenticated);

//pass asset id in each one of then
app.put('/:id/negotiate', negotiatePrice )
app.put('/:id/accept', acceptRequest)
app.put('/:id/deny', denyRequest);
export default app