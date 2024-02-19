import express, { Application, Request, Response } from "express";
import bodyParser, { urlencoded } from "body-parser";
import path from "path";
import multer from "multer";

import { Adminroutes } from "../routes/Adminroutes";
import { Vendorroutes } from "../routes/Vendorroutes";

async function ExpressApp(app: Application) {
  // @DESC middleware setups
  app.use(express.static("../../images"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  const upload = multer();
  // for form-data
  //   app.use(upload.none());
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  app.use("/admin", upload.none(), Adminroutes);
  app.use("/vendor", Vendorroutes);
}

export default ExpressApp;
