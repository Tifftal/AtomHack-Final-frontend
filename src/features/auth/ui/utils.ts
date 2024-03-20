export const ValidateForm = (
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
                    ? 'Имя должно содержать не менее 2х символов'
                    : null,
            surname:
                values.surname.length < 2 ? 'Фамилия должна содержать не менее 2х символов' : null,
            middlename:
                values.middlename.length < 2 ? 'Отчество должно содержать не менее 2х символов' : null,
            role:
                values.role.length < 2 ? 'Должность должна содержать не менее 2х символов' : null,
        };
    }

    if (active === 1) {
        return {
            email: /^\S+@\S+$/.test(values.email) ? null : 'Некорректный email',
            password:
                values.password.length < 6 ? 'Пароль должен содержать не менее 6 символов' : null,
            confirmPassword:
                values.password !== values.confirmPassword ? 'Пароли не совпадают' : null,
        };
    }

    if (active === 2) {
        return {
            code:
                values.code.trim().length < 6 ? "Неверный код" : null,
        };
    }

    return {}; // Вернуть пустой объект, если ошибок нет
}
