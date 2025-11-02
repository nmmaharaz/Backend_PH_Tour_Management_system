import cors from "cors";
import express, { Request, Response } from "express";
import { router } from "./app/routes";
import { globalError } from "./app/middlewares/globalError";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";
import { envVars } from "./app/config/env";
import "./app/config/passport"

const app = express();
app.use(expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false, 
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to PH Tour Management Backend")
})

app.use(globalError)

app.use(notFound)


export default app