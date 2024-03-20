export type UserApi = {
    ID: string,
    Name: string,
    Surname: string,
    Middlename: string,
    Email: string,
    Password: string,
    Role: string,    
}

export type UserModel = {
    id: string,
    name: string,
    surname: string,
    middlename: string,
    email: string,
    password: string,
    role: string, 
}

export const normalizeUser = (user: UserApi): UserModel => ({
    id: user.ID,
    name: user.Name,
    surname: user.Surname,
    middlename: user.Middlename,
    email: user.Email,
    password: user.Password,
    role: user.Role
})