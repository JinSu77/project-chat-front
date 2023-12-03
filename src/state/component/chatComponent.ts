import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IConversation } from '../../interfaces/conversation/IConversation';
import { IChannel } from '../../interfaces/channel/IChannel';

export type ChatComponentType = 'conversations' | 'channels' | null;

export interface ChatComponentState {
    data: IConversation[] | IChannel[];
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
