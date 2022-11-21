import React from 'react';
import InputField from '../components/InputField/InputField';
import Statistics from '../components/Statistics/Statistics';
import WordListViewer from '../components/WordListViewer/WordListViewer';
import WORD_LIST from '../data/wordList.json'
import config from '../data/config.json'
import MyPopup from '../components/Popup/MyPopup';
import './App.css';

function App() {
    const [errorIndexSet, setErrorIndexSet] = React.useState<Set<number>>(new Set())
    const [currWordIndex, setCurrWordIndex] = React.useState<number>(0)
    const [correctChars, setCorrectChars] = React.useState<number>(0)
    const [inputStr, setInputStr] = React.useState<string>('')
    const [intervalId, setIntervalId] = React.useState<number>(0)
    const [secondLeft, setSecondLeft] = React.useState<number>(config.testSeconds)
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
    const [inputAvailable, setInputAvailable] = React.useState<boolean>(true)

    const resetGame = React.useCallback(() => {
        clearInterval(intervalId)
        setErrorIndexSet(new Set())
        setCurrWordIndex(0)
        setCorrectChars(0)
        setInputStr('')
        setIntervalId(0)
        setSecondLeft(config.testSeconds)
        setIsModalOpen(false)
        setInputAvailable(true)
    }, [intervalId])

    const handleSecondCount = React.useCallback(() => {
        const id: NodeJS.Timeout = setInterval(() => {
            setSecondLeft(prev => prev - 1)
        }, 1000)
        setIntervalId(+id)
    }, [])

    React.useEffect(() => {
        if (!secondLeft) {
            // Time is up
            clearInterval(intervalId)
            setInputAvailable(false)
            setIsModalOpen(true)
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
            setCorrectChars(prevState => prevState + correctCtr)
            if (WORD_LIST[currWordIndex] !== inputStr.trim()) {
                setErrorIndexSet(prevState => new Set([...Array.from(prevState), currWordIndex]))
            }
            setInputStr('')
            setCurrWordIndex(prev => prev < WORD_LIST.length - 1 ? prev + 1 : 0)
        }
    }, [inputStr, currWordIndex, intervalId, secondLeft, handleSecondCount])

    return (
        <div className="App centered">
            <h1>Typing Speed Test</h1>
            <main>
                <Statistics resetGame={resetGame} correctCpm={correctChars} correctWpm={errorIndexSet.size} timeLeft={secondLeft} lastSeconds={config.lastSeconds} />
                <WordListViewer errorIndexSet={errorIndexSet} wordList={WORD_LIST} currWordIndex={currWordIndex} />
                <InputField handleKeyEvent={setInputStr} value={inputStr} disabled={!inputAvailable} />
            </main>
            <footer>Developed By Ofir Aghai</footer>
            <MyPopup isOpen={isModalOpen} onClose={resetGame} correctChars={correctChars} errorWords={errorIndexSet.size} />
        </div>
    );
}

export default App;
