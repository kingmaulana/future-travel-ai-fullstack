import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice.js';

export const store = configureStore({
reducer: {
    auth: authReducer,
},
middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    serializableCheck: {
        ignoredActions: ['auth/login/fulfilled'],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['auth.user'],
    },
    }),
});
