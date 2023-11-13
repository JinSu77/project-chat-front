import { Conversation } from "../conversation/IConversation";

export interface IUser {
    user: User;
}

export interface User {
    id:            number;
    username:      string;
    lastName:      string;
    firstName:     string;
    email:         string;
    roles:         Role[];
    conversations: Conversation[];
}

export interface Role {
    id:   number;
    name: string;
}