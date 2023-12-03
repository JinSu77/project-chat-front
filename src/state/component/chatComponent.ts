import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IConversationAttributes } from '../../interfaces/conversation/IConversationAttributes';
import { IChannelAttributes } from '../../interfaces/channel/IChannelAttributes';

export type ChatComponentType = 'conversations' | 'channels' | null;

export interface ChatComponentState {
    data: IConversationAttributes[] | IChannelAttributes[];
    type: ChatComponentType;
}

const initialState: ChatComponentState = {
    data: [],
    type: null,
};

export const chatComponentSlice = createSlice({
    name: 'chatComponent',
    initialState,
    reducers: {
        setChatComponent: (
            state,
            action: PayloadAction<ChatComponentState>
        ) => {
            return {
                ...state,
                data: action.payload.data,
                type: action.payload.type,
            };
        },
        resetToDefault: () => initialState,
    },
});

export const { setChatComponent, resetToDefault } = chatComponentSlice.actions;

export default chatComponentSlice.reducer;
