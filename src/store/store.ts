import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../state/data/authentication/authentication';
import chatComponentReducer from '../state/component/chatComponent';
import channelsReducer from '../state/data/channels/channels';
import conversationsReducer from '../state/data/conversations/conversations';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
};

const reducer = combineReducers({
    authentication: authenticationReducer,
    chatComponent: chatComponentReducer,
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
