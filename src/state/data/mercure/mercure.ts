import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface MercureState {
    token?: string | null;
    topics: string[];
}

const initialState: MercureState = {
    token: null,
    topics: [],
};

export const mercureSlice = createSlice({
    name: 'mercure',
    initialState,
    reducers: {
        resetToDefault: () => initialState,
        addTopic: (state, action: PayloadAction<{ topic: string }>) => {
            return {
                ...state,
                topics: [...state.topics, action.payload.topic],
            };
        },
        removeTopic: (state, action: PayloadAction<{ topic: string }>) => {
            return {
                ...state,
                topics: state.topics.filter(
                    (topic) => topic !== action.payload.topic
                ),
            };
        },
        setToken: (state, action: PayloadAction<{ token: string | null }>) => {
            return {
                ...state,
                token: action.payload.token,
            };
        },
        setTopics: (state, action: PayloadAction<{ topics: string[] }>) => {
            return {
                ...state,
                topics: action.payload.topics,
            };
        },
    },
});

export const { resetToDefault, addTopic, removeTopic, setToken, setTopics } =
    mercureSlice.actions;

export default mercureSlice.reducer;
