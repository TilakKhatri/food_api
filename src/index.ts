import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 4444;
import setupDB from "./config/db";
import ExpressApp from "./services/express";

async function startServer() {
  const app = express();
/*
  app.use(cors({
origin:[
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  "http://localhost:5173",
],
credentials:true,
  }))
  */
  await setupDB();
  await ExpressApp(app);

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

startServer();
