import express, { json, urlencoded } from "express";
import session from "express-session";
import http from "http";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";
import "@babel/polyfill";

import passport from "./setup/passport";
import "./setup/db";
import { testRouter, authRouter } from "./routes";

const app = express();
const server = http.createServer(app);

app.use(logger("dev"));
app.use(json());
app.use(cors());
app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "../public")));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/test", testRouter);
app.use("/api/auth", authRouter);

export { server };
export default app;
