import { createSlice } from '@reduxjs/toolkit';
import { IChannel } from '../../../interfaces/channel/IChannel';
import { IMessage } from '../../../interfaces/message/IMessage';

const initialState: { data: IChannel[] } = {
    data: [],
};

export const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        addMessage: (
            state,
            action: {
                type: string;
                payload: {
                    id: number;
                    message: IMessage;
                };
            }
        ) => {
            const channel = state.data.find((c) => c.id === action.payload.id);

            if (channel !== undefined) {
                const messageAlreadyExists = channel.messages.some(
                    (m) => m.id === action.payload.message.id
                );

                if (!messageAlreadyExists) {
                    channel.messages.push(action.payload.message);
                }
            }
        },
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

export const { resetToDefault, setChannels } = channelsSlice.actions;

export default channelsSlice.reducer;
