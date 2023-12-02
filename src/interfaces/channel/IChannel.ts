import { IMessage } from '../message/IMessage';

export interface IChannel {
    id: number;
    name: string;
    messages: IMessage[];
}
