import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMessage } from '../../interfaces/message/IMessage';

export type ChatComponentType = 'conversations' | 'channels' | null;

export interface ChatComponentState {
    activeConversation: number;
    activeConversationName: string;
    messages: IMessage[];
    type: ChatComponentType;
    isLoading: boolean;
}

const initialState: ChatComponentState = {
    activeConversation: 0,
    activeConversationName: '',
    messages: [],
    type: null,
    isLoading: false,
};

export const chatComponentSlice = createSlice({
    name: 'chatComponent',
    initialState,
    reducers: {
        setActiveConversation: (
            state,
            action: PayloadAction<{
                activeConversation: number;
                activeConversationName: string;
                messages: IMessage[];
            }>
        ) => {
            return {
                ...state,
                activeConversation: action.payload.activeConversation,
                activeConversationName: action.payload.activeConversationName,
                messages: action.payload.messages,
            };
        },
        setChatComponentType: (
            state,
            action: PayloadAction<{ type: ChatComponentType }>
        ) => {
            return {
                ...state,
                type: action.payload.type,
            };
        },
        setChatComponentLoading: (
            state,
            action: PayloadAction<{ isLoading: boolean }>
        ) => {
            return {
                ...state,
                isLoading: action.payload.isLoading,
            };
        },
        resetToDefault: () => initialState,
    },
});

export const {
    setActiveConversation,
    setChatComponentType,
    setChatComponentLoading,
    resetToDefault,
} = chatComponentSlice.actions;

export default chatComponentSlice.reducer;
