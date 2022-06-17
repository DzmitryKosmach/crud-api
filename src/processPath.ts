import { IncomingMessage, ServerResponse } from "http";
import { convertToString } from "./common/utils";
import {
  METHOD_GET,
  CONTENT_TYPE,
  METHOD_POST,
  METHOD_PUT,
  METHOD_DELETE,
  HTTP_STATUS_CODE_404,
  HTTP_STATUS_CODE_500,
} from "./common/config";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "./resources/users/user.controller";

const USERS_PATH = "/api/users";
const USERS_PATH_SLASH = "/api/users/";

export const processPath = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    const reqUrlString = convertToString(req.url);
    switch (true) {
      case reqUrlString === USERS_PATH && req.method === METHOD_GET:
        await getUsers(req, res);
        break;

      case reqUrlString.startsWith(USERS_PATH_SLASH) &&
        req.method === METHOD_GET:
        const userId = getPathParamId(reqUrlString);
        getUser(req, res, userId);
        break;

      case reqUrlString === USERS_PATH && req.method === METHOD_POST:
        createUser(req, res);
        break;

      case reqUrlString.startsWith(USERS_PATH_SLASH) &&
        req.method === METHOD_PUT:
        const userIdPut = getPathParamId(reqUrlString);
        updateUser(req, res, userIdPut);
        break;

      case reqUrlString.startsWith(USERS_PATH_SLASH) &&
        req.method === METHOD_DELETE:
        const userIdDelete = getPathParamId(reqUrlString);
        deleteUser(req, res, userIdDelete);
        break;

      default:
        res.writeHead(HTTP_STATUS_CODE_404, CONTENT_TYPE);
        res.end(JSON.stringify({ message: "Sorry, but this route not found" }));
    }
  } catch (error) {
    console.error((error as Error).message);
    res.writeHead(HTTP_STATUS_CODE_500, CONTENT_TYPE);
    res.end(
      JSON.stringify({ message: "Something went wrong on th server side" })
    );
  }
};

function getPathParamId(url: string): string {
  return convertToString(url.split("/")[3]);
}
