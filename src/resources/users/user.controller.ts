import { IncomingMessage, ServerResponse } from "http";
import * as usersService from "./user.service";
import { CONTENT_TYPE } from "../../common/config";
import { getPostData, uuidValidate } from "../../common/utils";
import User from "./user.model";

async function getUsers(_: IncomingMessage, res: ServerResponse) {
  try {
    const users = await usersService.getAll();
    res.writeHead(200, CONTENT_TYPE);
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

async function getUser(_: IncomingMessage, res: ServerResponse, id: string) {
  try {
    validateUuid(id, res);

    const user = await usersService.getById(id);

    if (!user) {
      res.writeHead(404, CONTENT_TYPE);
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      res.writeHead(200, CONTENT_TYPE);
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
}

async function createUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await getPostData(req);
    const bodyObj = JSON.parse(body);
    delete bodyObj.id;

    if ("username" in bodyObj && "age" in bodyObj && "hobbies" in bodyObj) {
      const newUser = new User(bodyObj);
      const createdUser = await usersService.save(newUser);

      res.writeHead(201, CONTENT_TYPE);
      res.end(JSON.stringify(createdUser));
    } else {
      res.writeHead(400, CONTENT_TYPE);
      res.end(
        JSON.stringify({ message: "User does not contain required fields" })
      );
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, CONTENT_TYPE);
    res.end(JSON.stringify({ message: "Error of server" }));
  }
}

async function updateUser(
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  try {
    validateUuid(id, res);

    const user = await usersService.getById(id);

    if (!user) {
      res.writeHead(404, CONTENT_TYPE);
      res.end(JSON.stringify({ message: `User with id=${id}  do not exist` }));
    } else {
      const body = await getPostData(req);
      const bodyObj = JSON.parse(body);
      bodyObj.id = id;

      const userForUpdate = new User(bodyObj);

      const updatedUser = await usersService.update(userForUpdate);

      res.writeHead(200, CONTENT_TYPE);
      res.end(JSON.stringify(updatedUser));
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(
  _: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  try {
    validateUuid(id, res);

      const user = await usersService.getById(id);

      if(!user) {
          res.writeHead(404, CONTENT_TYPE)
          res.end(JSON.stringify({ message: `User with id=${id}  do not exist` }))
      } else {
          await usersService.remove(id)
          res.writeHead(200, CONTENT_TYPE)
          res.end(JSON.stringify({ message: `User with id=${id} removed` }))
      }
  } catch (error) {
      console.log(error)
  }
}

function validateUuid(id: string, res: ServerResponse){
  if (uuidValidate(id)) {
    res.writeHead(400, CONTENT_TYPE);
    res.end(JSON.stringify({ message: "User id is invalid (not uuid)" }));
  }
}

export { getUsers, getUser, createUser, updateUser, deleteUser };
