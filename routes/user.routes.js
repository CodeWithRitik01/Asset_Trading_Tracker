import express from "express"
import { isAuthenticated } from "../middlewares/auth.js"
import { createUser, login, logout } from "../controlers/user.controller.js";

const app = express.Router();

app.post('/signup', createUser)
app.post('/login', login)

app.use(isAuthenticated)

app.get('/logout', logout)

export default app;