import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5050;
export const DATABASE = process.env.DATABASE;

export const JWT_KEY = process.env.JWT_KEY;
export const JWT_EXPIRE_TIME = Number(process.env.JWT_EXPIRE_TIME);

export const EMAIL_HOST = process.env.EMAIL_HOST;
export const EMAIL_PORT = Number(process.env.EMAIL_PORT);
export const EMAIL_SECURITY = process.env.EMAIL_SECURITY === "true";
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
export const EMAIL_UN_AUTH = process.env.EMAIL_UN_AUTH === "true";

export const WEB_CACHE = process.env.WEB_CACHE === "true";
export const MAX_JSON_SIZE = process.env.MAX_JSON_SIZE;
export const URL_ENCODE = process.env.URL_ENCODE === "true";

export const REQUEST_TIME = Number(process.env.REQUEST_TIME);
export const REQUEST_NUMBER = Number(process.env.REQUEST_NUMBER);
