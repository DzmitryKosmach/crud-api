import http from "http";
import cluster from 'cluster';
import os from 'os';
import { NODE_ENV, PORT } from "./common/config";
import { processPath } from "./processPath";

const pid = process.pid;

if (cluster.isPrimary) {
  const count = os.cpus().length;
  console.log(`Primary pid: ${pid}`);
  console.log(`Starting ${count} forks`);
  for (let i = 0; i < count; i++) cluster.fork();
} else {
  const id = cluster.worker?.id;
  console.log(`Worker: ${id}, pid: ${pid}, port: ${PORT}`);
  const server = http.createServer((req, res) => {
    processPath(req, res);
  });

  server.listen(PORT, () => {
    console.log(
      `Server is running on http://localhost:${PORT} in ${NODE_ENV} mode`
    );
  });
}