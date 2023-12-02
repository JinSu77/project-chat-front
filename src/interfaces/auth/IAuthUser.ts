import { IRole } from '../role/IRole';

export interface User {
    id: number;
    username: string;
    lastName: string;
    firstName: string;
    email: string;
    roles: IRole[];
    conversations: UserConversation[];
}

export interface UserConversation {
    id: number;
    type: string;
}
