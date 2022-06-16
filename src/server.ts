import http from "http";
import { PORT } from "./common/config";
import { processPath } from "./processPath";

const server = http.createServer((req, res) => {
  processPath(req, res);

  /*  if (req.url === "/api/users" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(usersStorage));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Rote Not Found" }));
  } */
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
