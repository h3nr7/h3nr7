import { IUser } from '../../../shared/interfaces/user.interface'
import { ICV } from '../../../shared/interfaces/cvs.interface'
import { IProfile } from '../../../shared/interfaces/profiles.interface'

export interface IPage {
    user: IUser
    cv: ICV
}