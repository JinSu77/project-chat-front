import { createSlice } from '@reduxjs/toolkit';
import { IChannel } from '../../../interfaces/channel/IChannel';

const initialState: { data: IChannel[] } = {
    data: [],
};

export const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        resetToDefault: () => initialState,
        setChannels: (
            state,
            action: {
                type: string;
                payload: {
                    channels: IChannel[];
                };
            }
        ) => {
            return {
                ...state,
                data: action.payload.channels,
            };
        },
    },
});

export const { resetToDefault, setChannels } = channelsSlice.actions;

export default channelsSlice.reducer;
