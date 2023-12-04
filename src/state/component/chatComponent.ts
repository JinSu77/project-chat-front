import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMessage } from '../../interfaces/message/IMessage';

export type ChatComponentType = 'conversations' | 'channels' | null;

export interface ChatComponentState {
    activeConversation: number;
    messages: IMessage[];
    type: ChatComponentType;
}

const initialState: ChatComponentState = {
    activeConversation: 0,
    messages: [],
    type: null,
};

export const chatComponentSlice = createSlice({
    name: 'chatComponent',
    initialState,
    reducers: {
        setActiveConversation: (
            state,
            action: PayloadAction<{
                activeConversation: number;
                messages: IMessage[];
            }>
        ) => {
            return {
                ...state,
                activeConversation: action.payload.activeConversation,
                messages: action.payload.messages,
            };
        },
        setChatComponent: (
            state,
            action: PayloadAction<ChatComponentState>
        ) => {
            return {
                ...state,
                type: action.payload.type,
            };
        },
        resetToDefault: () => initialState,
    },
});

export const { setActiveConversation, setChatComponent, resetToDefault } =
    chatComponentSlice.actions;

export default chatComponentSlice.reducer;
