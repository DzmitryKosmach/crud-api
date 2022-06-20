import http from "http";
import { processPath } from "./processPath";

export const server = http.createServer((req, res) => {
  processPath(req, res);
});