// src/redux/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userSlice from './Slice/user.Slice';
import messageSlice from './Slice/message.Slice';
import socketSlice from './Slice/socket.Slice';

const rootReducer = combineReducers({
    user: userSlice,
    messages: messageSlice,
    socket: socketSlice,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'messages'], // only user and messages will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);
export default store;
