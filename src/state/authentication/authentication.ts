import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user/IUser';

export interface AuthenticationState {
    loggedIn: boolean;
    token: string | null;
    user?: IUser | null;
}

const initialState: AuthenticationState = {
    loggedIn: false,
    token: null,
    user: null,
};

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login: (
            state: AuthenticationState,
            action: PayloadAction<AuthenticationState>
        ) => {
            state.loggedIn = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state: AuthenticationState) => {
            state.loggedIn = false;
            state.token = null;
            state.user = null;
            return state;
        },
    },
});

export const { login, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
