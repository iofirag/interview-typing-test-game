import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: { isModalOpen: false, isInputAvailable: true },
  reducers: {
    setIsModalOpen(state, action) {
        state.isModalOpen = action.payload
    },
    setIsInputAvailable(state, action) {
        state.isInputAvailable = action.payload
    },
  }
});

export const uiActions = uiSlice.actions;