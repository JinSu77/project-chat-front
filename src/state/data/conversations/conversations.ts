import { createSlice } from '@reduxjs/toolkit';
import { IConversation } from '../../../interfaces/conversation/IConversation';
import { IMessage } from '../../../interfaces/message/IMessage';

const initialState: { data: IConversation[] } = {
    data: [],
};

export const conversationsSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        resetToDefault: () => initialState,
        addConversation: (
            state,
            action: {
                type: string;
                payload: {
                    conversation: IConversation;
                };
            }
        ) => {
            const conversationAlreadyExists = state.data.some(
                (c) => c.id === action.payload.conversation.id
            );

            if (!conversationAlreadyExists) {
                return {
                    ...state,
                    data: [...state.data, action.payload.conversation],
                };
            }
        },
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
            const conversation = state.data.find(
                (c) => c.id === action.payload.id
            );

            if (conversation !== undefined) {
                const messageAlreadyExists = conversation.messages.some(
                    (m) => m.id === action.payload.message.id
                );

                if (!messageAlreadyExists) {
                    conversation.messages.push(action.payload.message);
                }
            }
        },
        removeConversation: (
            state,
            action: {
                type: string;
                payload: {
                    id: number;
                };
            }
        ) => {
            return {
                ...state,
                data: state.data.filter(
                    (conversation) => conversation.id !== action.payload.id
                ),
            };
        },
        setConversations: (
            state,
            action: {
                type: string;
                payload: {
                    conversations: IConversation[];
                };
            }
        ) => {
            return {
                ...state,
                data: action.payload.conversations,
            };
        },
    },
});

export const {
    resetToDefault,
    addMessage,
    addConversation,
    removeConversation,
    setConversations,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
