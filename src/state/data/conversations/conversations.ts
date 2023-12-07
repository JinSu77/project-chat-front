import { createSlice } from '@reduxjs/toolkit';
import { IConversation } from '../../../interfaces/conversation/IConversation';

const initialState: { data: IConversation[] } = {
    data: [],
};

export const conversationsSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
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
