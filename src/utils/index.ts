import delay from "./delay";
import { request } from "./request";
import { storage } from "./storage";

const { get, post, put, delete: del, option: ops } = request;

export { del, delay, get, ops, post, put, storage };
