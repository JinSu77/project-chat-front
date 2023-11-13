import { Message } from "../message/IMessage";
import { Role } from "../user/IUser";

export interface IConversation {
    conversation: Conversation;
}

export interface Conversation {
    id:           number;
    name:         string;
    type:         string;
    participants: Participant[];
    messages:     Message[];
}

export interface Participant {
    id:        number;
    username:  string;
    lastName:  string;
    firstName: string;
    email:     string;
    roles:     Role[];
}
