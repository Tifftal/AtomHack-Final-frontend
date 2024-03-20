import { UserLogin, UserModel } from "../model";
import { apiInstance } from "../../../shared/api/AxiosBaseApi";

const ENDPOINTS = {
    login: "/login",
    register: "/register",
    logout: "/logout",
    check: "/check",
};

export const login = async (data: UserLogin) => {
    const response = await apiInstance.post(ENDPOINTS.login, data);
    if (response.status === 400) {
        throw new Error("Bad request");
    }

    if (response.status === 403) {
        throw new Error("Forbidden");
    }

    if ( response.status === 404 ) {
        throw new Error("Not found");
    }

    if ( response.status === 500 ) {
        throw new Error("Server error");
    }

    return response.data;
}

export const register = async (data: UserModel) => {
    console.log(apiInstance);
    const response = await apiInstance.post(ENDPOINTS.register, data);
    if (response.status === 400) {
        throw new Error("Bad request");
    }

    if (response.status === 403) {
        throw new Error("Forbidden");
    }

    if ( response.status === 404 ) {
        throw new Error("Not found");
    }

    if ( response.status === 500 ) {
        throw new Error("Server error");
    }

    return response.data;
}

export const logout = async () => {
    const response = await apiInstance.post(ENDPOINTS.logout);
    
    if (response.status === 400) {
        throw new Error("Bad request");
    }

    if (response.status === 403) {
        throw new Error("Forbidden");
    }

    if ( response.status === 404 ) {
        throw new Error("Not found");
    }

    if ( response.status === 500 ) {
        throw new Error("Server error");
    }

    return response.data;
}

export const check = async () => {
    const response = await apiInstance.get(ENDPOINTS.check);
    
    if (response.status === 400) {
        throw new Error("Bad request");
    }

    if (response.status === 403) {
        throw new Error("Forbidden");
    }

    if ( response.status === 404 ) {
        throw new Error("Not found");
    }

    if ( response.status === 500 ) {
        throw new Error("Server error");
    }

    return response.data;
}