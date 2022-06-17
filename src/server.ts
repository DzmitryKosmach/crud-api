import http from "http";
import { NODE_ENV, PORT } from "./common/config";
import { processPath } from "./processPath";

const server = http.createServer((req, res) => {
  processPath(req, res);
});

server.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT} in ${NODE_ENV} mode`
  );
});
