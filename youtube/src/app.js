import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()


// app.use is usually used in middlewares

// app.use(cors) --> CORS will be initialized 
// however we write origin in which we enter our frontend url which will allow only the origin url to talk with our backend
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// we get data in diff json format
app.use(express.json({limit: "16kb"}))

// we want to encode our url, "%20" etc
// app.use(express.urlencoded({extended: true, limit: "16kb"}))

// we will save our static files like imgs in public 
// app.use(express.static("public"))
// app.use(cookieParser)


//routes import we can add here as well
import useRouter from "../src/routes/user.routes.js"
//route declaration

app.use("/api/v1/users", useRouter)
// standard with version1

// https://localhost:8000/api/v1/users/register
// since we then go to register
// similarly login is easy, we can write login in routes and no need to change anything in this file


export { app }