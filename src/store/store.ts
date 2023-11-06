import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../state/authentication/authentication';
import channelsReducer from '../state/channels/channels';
import conversationsReducer from '../state/conversations/conversations';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
};

const reducer = combineReducers({
    authentication: authenticationReducer,
    channels: channelsReducer,
    conversations: conversationsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
