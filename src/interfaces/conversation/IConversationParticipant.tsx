import { IRole } from '../role/IRole';

export interface IConversationParticipant {
    id: number;
    username: string;
    lastName: string;
    firstName: string;
    email: string;
    roles: IRole[];
}
