import { IMessage } from '../message/IMessage';
import { IConversationParticipant } from './IConversationParticipant';
export interface IConversation {
    id: number;
    type: string;
    participants: IConversationParticipant[];
    messages: IMessage[];
}
