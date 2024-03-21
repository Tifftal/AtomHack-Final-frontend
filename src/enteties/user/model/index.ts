export type UserApi = {
    ID: string,
    Name: string,
    Surname: string,
    Middlename: string,
    Email: string,
    Password: string,
    Role: string,    
}

export type UserLogin = {
    email: string,
    password: string
}

export type UserModel = {
    name: string,
    surname: string,
    middlename: string,
    email: string,
    password: string,
    role: string, 
}

export type ConfirmPair = {
    id: string,
    code: string
}

export const normalizeUser = (user: UserApi): UserModel => ({
    name: user.Name,
    surname: user.Surname,
    middlename: user.Middlename,
    email: user.Email,
    password: user.Password,
    role: user.Role
})

