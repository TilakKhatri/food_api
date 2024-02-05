import express, { Express, Request, Response } from "express";

const router = express.Router();

router.get("/vendor", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

export { router as Vendorroutes };
