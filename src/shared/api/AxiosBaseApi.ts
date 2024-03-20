import axios from "axios";
import { AUTH_URL } from "../config";

export const apiInstance = axios.create({
    baseURL: AUTH_URL,
    // withCredentials: true
});