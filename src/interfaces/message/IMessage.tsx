export interface IMessage {
    data: Message;
}

export interface Message {
    message: Message;
}

export interface Message {
    id:              number;
    content:         string;
    channel_id:      number|null;
    conversation_id: number|null;
    user_id:         number;
    created_at:      Date;
    received_at:     Date|null;
}
