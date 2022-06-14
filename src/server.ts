import http from "http";
import usersStorage from "./resources/users/user.storage"
import { PORT } from "./common/config";

const server = http.createServer((req, res) => {
  if(req.url === '/api/users' && req.method === 'GET'){
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(usersStorage));
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Rote Not Found'}));
  }
}
  
    
);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})