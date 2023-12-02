import { createSelector, createSlice } from '@reduxjs/toolkit';
import { IChannel } from '../../../interfaces/channel/IChannel';
import { RootState } from '../../../store/store';
import { IMessage } from '../../../interfaces/message/IMessage';

const initialState: { data: IChannel[] } = {
    data: [],
};

export const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        resetToDefault: () => initialState,
        setChannels: (
            state,
            action: {
                type: string;
                payload: {
                    channels: IChannel[];
                };
            }
        ) => {
            return {
                ...state,
                data: action.payload.channels,
            };
        },
    },
});

const selectChannels = (state: RootState): IChannel[] => state.channels.data;

type Selector<S> = (state: RootState) => S;

export const selectMessagesByChannelId = (
    channelId: number
): Selector<IMessage[]> =>
    createSelector([selectChannels], (channels: IChannel[]) => {
        const channel = channels.find((c: IChannel) => c.id === channelId);

        if (typeof channel === 'undefined') {
            return [];
        }

        return channel.messages;
    });

export const { resetToDefault, setChannels } = channelsSlice.actions;

export default channelsSlice.reducer;
