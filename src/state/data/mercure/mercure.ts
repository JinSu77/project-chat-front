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
        resetToDefault: () => initialState,
    },
});

export const { resetToDefault, setToken, setTopics } = mercureSlice.actions;

export default mercureSlice.reducer;
