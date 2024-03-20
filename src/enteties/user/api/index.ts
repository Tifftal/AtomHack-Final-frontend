import { UserModel } from "../model";
import { API_URL } from "../../../shared/config";

export async function loginUser(): Promise<UserModel> {
    const response = await fetch(`${API_URL}/auth/login`);
    const user = await response.json();

    if(!user) {
        throw new Error ('Нет такого пользователя')
    }

    return user;
}