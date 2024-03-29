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
        addContact: (
            state,
            action: {
                type: string;
                payload: {
                    contact: IUser;
                };
            }
        ) => {
            return {
                ...state,
                data: [...state.data, action.payload.contact],
            };
        },
        removeContact: (
            state,
            action: {
                type: string;
                payload: {
                    id: number;
                };
            }
        ) => {
            return {
                ...state,
                data: state.data.filter(
                    (contact) => contact.id !== action.payload.id
                ),
            };
        },
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

export const { resetToDefault, addContact, removeContact, setContacts } =
    contactsSlice.actions;

export default contactsSlice.reducer;
