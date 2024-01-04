import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../../interfaces/user/IUser';

const initialState: { data: IUser[] } = {
    data: [],
};

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        resetToDefault: () => initialState,
        setContacts: (
            state,
            action: {
                type: string;
                payload: {
                    contacts: IUser[];
                };
            }
        ) => {
            return {
                ...state,
                data: action.payload.contacts,
            };
        },
    },
});

export const { resetToDefault, setContacts } = contactsSlice.actions;

export default contactsSlice.reducer;
