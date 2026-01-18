import express, {NextFunction, Request, Response} from "express";
import { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import { configDotenv } from "dotenv";
import appRouter from "./src/router.js";
import configuration from "./src/config/config.js";
import multer from "multer";
import path from "path/win32";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

configDotenv()


// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (_req: any, _file: any, cb: (arg0: null, arg1: string) => void) => {
    cb(null, 'uploads/'); // Files will be stored in the 'uploads' folder
  },
  filename: (_req: any, file: { originalname: string; }, cb: (arg0: null, arg1: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    console.log(uniqueSuffix);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});


const upload = multer({ storage });

const app:Express = express();
//CORS = Cross Origin Resource Sharing
app.use(cors({
    origin: "*"
}));


app.use("/uploads",express.static(path.join(__dirname, 'uploads')));


app.use(morgan("dev"));

app.use(express.json());

app.get("/", (_req:Request, res:Response)=>{
    res.send("Application is running");
})

app.post("/upload", upload.single('file'), (req:Request, res:Response)=>{
    res.json({
        message: "File uploaded successfully",
        file: req.file
    });
});

app.use("/api", appRouter);

//Error handling
app.use((err:Error, _:Request, res:Response, __:NextFunction)=>{
    res.json({
        message: err?.message
    }).status(500);
})

app.listen(configuration.app_port, ()=>{
    console.log("application is running http://localhost:"+configuration.app_port);
})

