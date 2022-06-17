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
  HTTP_STATUS_CODE_200_,
  HTTP_STATUS_CODE_201_,
  HTTP_STATUS_CODE_204_,
  HTTP_STATUS_CODE_400_,
  HTTP_STATUS_CODE_404_,
  HTTP_STATUS_CODE_500_,
} = process.env;

const METHOD_GET = convertToString(METHOD_GET_);
const METHOD_POST = convertToString(METHOD_POST_);
const METHOD_PUT = convertToString(METHOD_PUT_);
const METHOD_DELETE = convertToString(METHOD_DELETE_);
const CONTENT_TYPE = JSON.parse(convertToString(CONTENT_TYPE_));
const HTTP_STATUS_CODE_200 = Number(HTTP_STATUS_CODE_200_);
const HTTP_STATUS_CODE_201 = Number(HTTP_STATUS_CODE_201_);
const HTTP_STATUS_CODE_204 = Number(HTTP_STATUS_CODE_204_);
const HTTP_STATUS_CODE_400 = Number(HTTP_STATUS_CODE_400_);
const HTTP_STATUS_CODE_404 = Number(HTTP_STATUS_CODE_404_);
const HTTP_STATUS_CODE_500 = Number(HTTP_STATUS_CODE_500_);

export {
  PORT,
  NODE_ENV,
  METHOD_GET,
  METHOD_POST,
  METHOD_PUT,
  METHOD_DELETE,
  CONTENT_TYPE,
  HTTP_STATUS_CODE_200,
  HTTP_STATUS_CODE_201,
  HTTP_STATUS_CODE_204,
  HTTP_STATUS_CODE_400,
  HTTP_STATUS_CODE_404,
  HTTP_STATUS_CODE_500,
};
