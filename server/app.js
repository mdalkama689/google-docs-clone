import express from "express";
import userRoutes from "./routes/user.route.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
const CLIENT_URL = process.env.CLIENT_URL;

const corsOption = {
  origin: CLIENT_URL,
  credentials: true,
};
const customFormat =
  ":method :url :status :res[content-length] - :response-time ms";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan(customFormat));
app.use(cors(corsOption));
app.use(cookieParser());
app.use("/api/v1/user", userRoutes);
export default app;
