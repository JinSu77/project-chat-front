import { IChannel } from '../interfaces/channel/IChannel';
import { IConversation } from '../interfaces/conversation/IConversation';

export interface IGetItemName {
    item?: IChannel | IConversation;
    authUsername: string | undefined;
}

const getItemName = ({ item, authUsername }: IGetItemName): string => {
    if (!item) return '';

    if ('name' in item) {
        const copyItem = item as IChannel;

        return copyItem.name;
    }

    if ('participants' in item && typeof authUsername === 'string') {
        const copyItem = item as IConversation;

        const user = copyItem.participants.filter(
            (participant) => participant.username !== authUsername
        );

        if (user.length !== 0) {
            return user[0].username;
        }
    }

    return 'undefined';
};

export default getItemName;
