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
        resetToDefault: () => initialState,
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

export const { resetToDefault, setConversations } = conversationsSlice.actions;

export default conversationsSlice.reducer;
