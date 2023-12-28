import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../interfaces/user/IUser';

export interface AuthenticationState {
    loggedIn: boolean;
    mercureToken?: string | null;
    token: string | null;
    user?: IUser | null;
}

const initialState: AuthenticationState = {
    loggedIn: false,
    mercureToken: null,
    token: null,
    user: null,
};

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthenticationState>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        resetToDefault: () => initialState,
    },
});

export const { login, resetToDefault } = authenticationSlice.actions;

export default authenticationSlice.reducer;
