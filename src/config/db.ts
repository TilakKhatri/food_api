import colors from "colors";
import dotenv from "dotenv";

const mongoose = require("mongoose");

dotenv.config();

const setupDB = async () => {
  // console.log('I called',process.env.REMOTE_MONGO_URI)
  try {
    mongoose
      .connect(process.env.REMOTE_MONGO_URI)
      .then(() => console.log(colors.green("Connected to MongoDB")))
      .catch((err: any) => console.error(colors.red("Connection error"), err));
  } catch (error) {
    console.log("DB url error", error);
  }
};

export default setupDB;
