import { Role } from "../user/IUser";

export interface IAuthUser {
    data: AuthUser
}

export interface AuthUser {
    user: User;
}

export interface User {
    id:            number;
    username:      string;
    lastName:      string;
    firstName:     string;
    email:         string;
    roles:         Role[];
    conversations: UserConversation[];
}

export interface UserConversation {
    id:   number;
    name: string;
    type: string;
}

