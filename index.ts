import express, {NextFunction, Request, Response} from "express";
import cors from "cors";
import morgan from "morgan";
import { configDotenv } from "dotenv";
import appRouter from "./src/router.js";
import configuration from "./src/config/config.js";

configDotenv()

const app = express();
//CORS = Cross Origin Resource Sharing
app.use(cors({
    origin: "*"
}));

app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Application is running");
})

app.use("/api", appRouter);

//Error handling
app.use((err:Error, _:Request, res:Response, __:NextFunction)=>{
    res.json({
        message: err?.message
    })
})

app.listen(configuration.app_port, ()=>{
    console.log("application is running http://localhost:"+configuration.app_port);
})

