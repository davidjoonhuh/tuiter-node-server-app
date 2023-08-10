import express from 'express';
import cors from 'cors';
import HelloController from './controllers/hello-controller.js';
import UserController from "./users/users-controller.js";
import TuitsController from './controllers/tuits/tuits-controller.js';
import AuthController from './users/auth-controller.js';
import session from "express-session";

const app = express();
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
app.use(
    session(sessionOptions)
);
app.use(express.json());
const port = process.env.PORT || 4000;
AuthController(app);
TuitsController(app);
HelloController(app);
UserController(app);
app.listen(4000);