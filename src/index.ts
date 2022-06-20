import { server} from "./app";
import { NODE_ENV, PORT } from "./common/config";

server.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT} in ${NODE_ENV} mode`
  );
});

export{ server, }
