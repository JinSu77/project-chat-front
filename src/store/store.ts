import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../state/data/authentication/authentication';
import chatComponentReducer from '../state/component/chatComponent';
import channelsReducer from '../state/data/channels/channels';
import contactsReducer from '../state/data/contacts/contacts';
import conversationsReducer from '../state/data/conversations/conversations';
import mercureReducer from '../state/data/mercure/mercure';
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
    contacts: contactsReducer,
    conversations: conversationsReducer,
    mercure: mercureReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
