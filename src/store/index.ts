import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { uiSlice } from './ui-slice';
import { counterSlice } from './counter-slice';
import { enableMapSet } from 'immer'

enableMapSet()

export const store = configureStore({
  middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    uiSlice: uiSlice.reducer,
    counterSlice: counterSlice.reducer,
  },
});
