import React from 'react';
import InputField from '../components/InputField/InputField';
import Statistics from '../components/Statistics/Statistics';
import WordListViewer from '../components/WordListViewer/WordListViewer';
import MyPopup from '../components/Popup/MyPopup';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui-slice'
import { counterActions } from '../store/counter-slice';
import './App.css';

function App() {
    const dispatch = useDispatch();
    const { isModalOpen, isInputAvailable } = useSelector((state: any) => state.uiSlice);
    const { remaningTimeMilis, intervalId, correctChars, inputStr, currWordIndex, errorIndexSet, WORD_LIST, config } = useSelector((state: any) => state.counterSlice);

    const resetGame = React.useCallback(() => {
        clearInterval(intervalId)
        dispatch(counterActions.clearErrorIndexSet())
        dispatch(counterActions.setCurrWordIndex(0))
        dispatch(counterActions.setCorrectChars(0))
        dispatch(counterActions.setInputStr(''))
        dispatch(counterActions.setIntervalId(0))
        dispatch(counterActions.setRemaningTimeMilis(config.gameSeconds * 1000))
        dispatch(uiActions.setIsModalOpen(false))
        dispatch(uiActions.setIsInputAvailable(true))
    }, [intervalId, dispatch, config.gameSeconds])

    const handleSecondCount = React.useCallback(() => {
        const d = new Date(Date.now())
        d.setSeconds(d.getSeconds() + config.gameSeconds)
        const id: NodeJS.Timeout = setInterval(() => {
            const deltaMilis = d.getTime() - Date.now()
            dispatch(counterActions.setRemaningTimeMilis(deltaMilis > 0 ? deltaMilis : 0))
        }, config.intervalMilis)
        dispatch(counterActions.setIntervalId(id))
    }, [dispatch, config])

    const handleTimeIsUp = React.useCallback(() => {
        clearInterval(intervalId)
        dispatch(uiActions.setIsInputAvailable(false))
        dispatch(uiActions.setIsModalOpen(true))
    }, [intervalId, dispatch])

    const handleInputStr = React.useCallback((key: string) => {
        dispatch(counterActions.setInputStr(key))
    }, [dispatch])



    React.useEffect(() => {
        if (remaningTimeMilis <= 0) {
            // Time is up
            handleTimeIsUp()
            return
        }
        if (!intervalId && inputStr) {
            // User first word
            handleSecondCount()
        }
        if (inputStr.at(-1) === ' ') {
            let correctCtr = 0
            const trimmedWord = inputStr.trim()
            for (let i = 0; i < WORD_LIST[currWordIndex].length; i++) {
                if (WORD_LIST[currWordIndex][i] === trimmedWord[i]) {
                    correctCtr++
                }
            }
            dispatch(counterActions.setCorrectChars(correctChars + correctCtr))
            if (WORD_LIST[currWordIndex] !== inputStr.trim()) {
                dispatch(counterActions.addToErrorIndexSet(currWordIndex))
            }
            dispatch(counterActions.setInputStr(''))
            dispatch(counterActions.setCurrWordIndex(currWordIndex < WORD_LIST.length - 1 ? currWordIndex + 1 : 0))
        }
    }, [inputStr, currWordIndex, intervalId, remaningTimeMilis, dispatch, handleTimeIsUp, handleSecondCount, correctChars, WORD_LIST])

    return (
        <div className="App centered">
            <h1>Typing Speed Test</h1>
            <main>
                <Statistics resetGame={resetGame}
                    correctCpm={correctChars}
                    correctWpm={errorIndexSet.size}
                    timeLeft={remaningTimeMilis / 1000}
                    lastSeconds={config.lastSeconds} />
                <WordListViewer errorIndexSet={errorIndexSet}
                    wordList={WORD_LIST}
                    currWordIndex={currWordIndex}
                    userInput={inputStr} />
                <InputField handleKeyEvent={handleInputStr} value={inputStr} disabled={!isInputAvailable} />
            </main>
            <footer>Developed By Ofir Aghai</footer>
            <MyPopup isOpen={isModalOpen} onClose={resetGame} correctChars={correctChars} errorWords={errorIndexSet.size} />
        </div>
    );
}

export default App;
