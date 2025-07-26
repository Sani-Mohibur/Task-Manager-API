import express from "express";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import {
  DATABASE,
  MAX_JSON_SIZE,
  PORT,
  REQUEST_NUMBER,
  REQUEST_TIME,
  URL_ENCODE,
  WEB_CACHE,
} from "./app/config/config.js";
import router from "./routes/api.js";

const app = express();

//Default
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODE }));

//Use limit
const limiter = rateLimit({ windowMs: REQUEST_TIME, max: REQUEST_NUMBER });
app.use(limiter);

//WEB_CACHE
app.set("etag", WEB_CACHE);

//Database connection
mongoose
  .connect(DATABASE, { autoIndex: true })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Database connection failed", error);
  });

//Routes
app.use("/api", router);

//PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
