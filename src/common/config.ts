import * as dotenv from "dotenv";
import path from "path";
import { convertToString } from "./utils";

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

const {
  PORT,
  NODE_ENV,
  METHOD_GET_,
  METHOD_POST_,
  METHOD_PUT_,
  METHOD_DELETE_,
  CONTENT_TYPE_,
} = process.env;

const METHOD_GET = convertToString(METHOD_GET_);
const METHOD_POST = convertToString(METHOD_POST_);
const METHOD_PUT = convertToString(METHOD_PUT_);
const METHOD_DELETE = convertToString(METHOD_DELETE_);
const CONTENT_TYPE = JSON.parse(convertToString(CONTENT_TYPE_));

export {
  PORT,
  NODE_ENV,
  METHOD_GET,
  METHOD_POST,
  METHOD_PUT,
  METHOD_DELETE,
  CONTENT_TYPE,
};
