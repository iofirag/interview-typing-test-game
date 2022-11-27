import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isModalOpen: false,
    isInputAvailable: true,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
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