export interface IUser {
    firstName: string
    lastName: string
    email: string
    cvId: string
    date?: string
    exp?: string
    tokenImg?: string
}

export interface IUsers {
    [id: string]: IUser
}