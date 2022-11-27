import { createSlice } from '@reduxjs/toolkit';
import config from '../data/config.json'
import WORD_LIST from '../data/wordList.json'


const initialState = {
    errorIndexSet: new Set(),
    currWordIndex: 0,
    correctChars: 0,
    inputStr: '',
    intervalId: 0,
    remaningTimeMilis: config.gameSeconds * 1000,
    WORD_LIST,
    config
}

export const counterSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    setIntervalId(state, action) {
        state.intervalId = action.payload
    },

    addToErrorIndexSet(state, action) {
        state.errorIndexSet.add(action.payload)
    },

    clearErrorIndexSet(state) {
        state.errorIndexSet = new Set()
    },

    setCurrWordIndex(state, action) {
        state.currWordIndex = action.payload
    },

    setRemaningTimeMilis(state, action) {
        state.remaningTimeMilis = action.payload
    },

    setCorrectChars(state, action) {
        state.correctChars = action.payload
    },

    clearCorrectChars(state) {
        state.correctChars = 0
    },

    incCorrectChars(state, action) {
        state.correctChars += action.payload
    },

    setInputStr(state, action) {
        state.inputStr = action.payload
    },
  }
});

export const counterActions = counterSlice.actions;