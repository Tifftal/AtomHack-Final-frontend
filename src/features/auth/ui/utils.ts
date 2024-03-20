import { TFunction } from "i18next";

export const ValidateForm = (
    t: TFunction,
    active: number,
    values: {
        name: string;
        surname: string;
        middlename: string;
        role: string;
        password: string;
        confirmPassword: string;
        email: string;
        code: string;
    }) => { 

    if (active === 0) {
        return {
            name:
                values.name.trim().length < 2
                    ? `${t("errors.name")}`
                    : null,
            surname:
                values.surname.length < 2 ? `${t("errors.surname")}` : null,
        };
    }

    if (active === 1) {
        return {
            email: /^\S+@\S+$/.test(values.email) ? null : `${t("errors.email")}`,
            password:
                values.password.length < 6 ? `${t("errors.password")}` : null,
            confirmPassword:
                values.password !== values.confirmPassword ? `${t("errors.err")}` : null,
        };
    }

    if (active === 2) {
        return {
            code:
                values.code.trim().length < 6 ? `${t("errors.wrongcode")}` : null,
        };
    }

    return {}; // Вернуть пустой объект, если ошибок нет
}
