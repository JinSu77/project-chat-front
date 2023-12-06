import { IConversationParticipant } from './IConversationParticipant';
export interface IConversation {
    id: number;
    type: string;
    participants: IConversationParticipant[];
}
