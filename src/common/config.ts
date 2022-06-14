import * as dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

export const { PORT, NODE_ENV } = process.env;
//const { authMode } = process.env;
//export const AUTH_MODE = authMode === "true";
