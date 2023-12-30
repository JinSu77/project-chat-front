import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMessage } from '../../interfaces/message/IMessage';

export type ChatComponentType = 'conversations' | 'channels' | null;

export interface ChatComponentState {
    activeConversationId: number;
    activeConversationName: string;
    messages: IMessage[];
    type: ChatComponentType;
    isLoading: boolean;
}

const initialState: ChatComponentState = {
    activeConversationId: 0,
    activeConversationName: '',
    messages: [],
    type: null,
    isLoading: false,
};

export const chatComponentSlice = createSlice({
    name: 'chatComponent',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<{ message: IMessage }>) => {
            return {
                ...state,
                messages: [...state.messages, action.payload.message],
            };
        },
        setActiveConversation: (
            state,
            action: PayloadAction<{
                activeConversationId: number;
                activeConversationName: string;
                messages: IMessage[];
            }>
        ) => {
            return {
                ...state,
                activeConversationId: action.payload.activeConversationId,
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
    addMessage,
    setActiveConversation,
    setChatComponentType,
    setChatComponentLoading,
    resetToDefault,
} = chatComponentSlice.actions;

export default chatComponentSlice.reducer;
