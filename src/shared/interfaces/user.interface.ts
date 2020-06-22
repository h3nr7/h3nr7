export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    cvId: string,
    exp?: string
}

export interface IUsers {
    [id: string]: IUser
}