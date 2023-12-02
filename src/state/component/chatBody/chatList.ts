import { createSlice } from '@reduxjs/toolkit';
import { IConversationAttributes } from '../../../interfaces/conversation/IConversationAttributes';
import { IChannelAttributes } from '../../../interfaces/channel/IChannelAttributes';

export interface ChatListState {
    data: IConversationAttributes[] | IChannelAttributes[];
    type: 'conversations' | 'channels' | null;
}

const initialState: ChatListState = {
    data: [],
    type: null,
};

export const chatListSlice = createSlice({
    name: 'chatList',
    initialState,
    reducers: {
        setChatList: (state, action) => {
            return {
                ...state,
                data: action.payload.data,
                type: action.payload.type,
            };
        },
        resetToDefault: () => initialState,
    },
});

export const { setChatList, resetToDefault } = chatListSlice.actions;

export default chatListSlice.reducer;
