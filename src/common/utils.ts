import { validate } from 'uuid';
import { IncomingMessage } from "http";

const uuidValidate = (uuid: string): boolean => {
  return !validate(uuid);
};

const convertToString = (value: string | undefined): string =>  (typeof value === "string") ? value: "";

const getPostData = (req: IncomingMessage):Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk.toString();
            })

            req.on('end', () => {
                resolve(body);
            })
        } catch (error) {
            reject(error);
        }
    })
}

export { convertToString, uuidValidate, getPostData, };