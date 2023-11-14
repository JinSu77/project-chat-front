import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthenticationState {
    token: string | null;
}

export const initialState: AuthenticationState = {
    token: null,
};

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login: (state: AuthenticationState, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        logout: (state: AuthenticationState) => {
            state.token = null;
        },
    },
});

export const { login, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
