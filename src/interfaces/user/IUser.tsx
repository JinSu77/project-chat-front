import { IConversation } from '../conversation/IConversation';
import { IRole } from '../role/IRole';

export interface IUser {
    id: number;
    username: string;
    lastName: string;
    firstName: string;
    email: string;
    roles: IRole[];
    conversations: IConversation[];
}
