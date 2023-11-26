export interface IMessage {
    id: number;
    content: string;
    channel_id: number | null;
    conversation_id: number | null;
    user_id: number;
    created_at: Date;
    received_at: Date | null;
}
