import { createSelector, createSlice } from '@reduxjs/toolkit';
import { IConversation } from '../../../interfaces/conversation/IConversation';
import { RootState } from '../../../store/store';
import { IMessage } from '../../../interfaces/message/IMessage';

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

const selectConversations = (state: RootState): IConversation[] =>
    state.conversations.data;

type Selector<S> = (state: RootState) => S;

export const selectMessagesByConversationId = (
    conversationId: number
): Selector<IMessage[]> =>
    createSelector([selectConversations], (conversations: IConversation[]) => {
        const conversation = conversations.find(
            (c: IConversation) => c.id === conversationId
        );

        if (typeof conversation === 'undefined') {
            return [];
        }

        return conversation.messages;
    });

export const { resetToDefault, setConversations } = conversationsSlice.actions;

export default conversationsSlice.reducer;
