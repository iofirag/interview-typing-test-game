import React from 'react';
import config from '../data/config.json'
import WORD_LIST from '../data/wordList.json'

interface Props {
    children?: React.ReactNode
}

export const GlobalContext = React.createContext({
    config,
    WORD_LIST,
    errorIndexSet: new Set<number>(),
    currWordIndex: 0,
    correctChars: 0,
    inputStr: '',
    intervalId: 0,
    remaningTimeMilis: config.gameSeconds * 1000,
    isModalOpen: false,
    isInputAvailable: true,
    resetGame: () => { },
    setInputStr: (str: string) => { },
});


export default function GlobalContextProvider(props: Props) {

    const [errorIndexSet, setErrorIndexSet] = React.useState<Set<number>>(new Set())
    const [currWordIndex, setCurrWordIndex] = React.useState<number>(0)
    const [correctChars, setCorrectChars] = React.useState<number>(0)
    const [inputStr, setInputStr] = React.useState<string>('')
    const [intervalId, setIntervalId] = React.useState<number>(0)
    const [remaningTimeMilis, setRemaningTimeMilis] = React.useState<number>(config.gameSeconds * 1000)
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
    const [isInputAvailable, setIsInputAvailable] = React.useState<boolean>(true)

    const resetGame = React.useCallback(() => {
        clearInterval(intervalId)
        setErrorIndexSet(new Set())
        setCurrWordIndex(0)
        setCorrectChars(0)
        setInputStr('')
        setIntervalId(0)
        setRemaningTimeMilis(config.gameSeconds * 1000)
        setIsModalOpen(false)
        setIsInputAvailable(true)
    }, [intervalId])

    const initInterval = React.useCallback(() => {
        const d = new Date(Date.now())
        d.setSeconds(d.getSeconds() + config.gameSeconds)
        const id: NodeJS.Timeout = setInterval(() => {
            const deltaMilis = d.getTime() - Date.now()
            setRemaningTimeMilis(deltaMilis > 0 ? deltaMilis : 0)
        }, config.intervalMilis)
        setIntervalId(+id)
    }, [])

    React.useEffect(() => {
        if (remaningTimeMilis <= 0) {
            // Time is up
            clearInterval(intervalId)
            setIsInputAvailable(false)
            setIsModalOpen(true)
            return
        }
        if (!intervalId && inputStr) {
            // User first word
            initInterval()
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
    }, [inputStr, currWordIndex, intervalId, remaningTimeMilis, initInterval])

    return (
        <GlobalContext.Provider value={{
            config,
            WORD_LIST,
            errorIndexSet,
            currWordIndex,
            correctChars,
            inputStr,
            intervalId,
            remaningTimeMilis,
            isModalOpen,
            isInputAvailable,
            resetGame,
            setInputStr
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}