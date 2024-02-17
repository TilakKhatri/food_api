import express from "express";
import dotenv from "dotenv";

const port = process.env.PORT || 4444;
import setupDB from "./config/db";
import ExpressApp from "./services/express";

async function startServer() {
  dotenv.config();
  const app = express();
  await setupDB();
  await ExpressApp(app);

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

startServer();
