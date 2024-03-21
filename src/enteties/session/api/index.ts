import { AUTH_URL } from "../../../shared";
import { Session } from "../model";

export async function getCookie(): Promise<Session> {
    const response = await fetch(`${AUTH_URL}/auth/login`);
    const session = await response.json();

    if(!session) {
        throw new Error ('Не удалось засетить куку')
    }

    return session;
}