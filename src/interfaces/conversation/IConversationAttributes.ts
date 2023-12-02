type IConversationParticipantAttributes = {
    id: number;
    username: string;
};

export interface IConversationAttributes {
    id: number;
    type: 'PRIVATE' | 'PUBLIC';
    participants: IConversationParticipantAttributes[];
}
