import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import userReducer from './features/Users/userSlice'
import loggedUserReducer from './features/Users/loggedUserSlice'
import taskReducer from './features/Tasks/taskSlice'
import { persistReducer, presistStore } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
    key: 'root',
    storage
}

const reducer = combineReducers({

    users: userReducer,
    loggedUser: loggedUserReducer,
    tasks: taskReducer
    
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) => (getDefaultMiddleware) => {
        serializableCheck: {
            ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"];
        }
    }
})

export const persistor = persistStore(store);
