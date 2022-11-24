import React, { useContext } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import Word from '../Word/Word';
import classes from './WordListViewer.module.css'

interface Props {
}

export default function WordListViewer(props: Props) {
    const {inputStr, errorIndexSet, currWordIndex, WORD_LIST} = useContext(GlobalContext);
    
    return (
        <div className={classes.grid}>
            {WORD_LIST.map((word: string, i: number) =>
                <Word key={word} 
                    wordKey={word} 
                    userInput={inputStr}
                    isError={i < currWordIndex && errorIndexSet.has(i)}
                    isCorrect={i < currWordIndex && !errorIndexSet.has(i)}
                    isHighlight={i === currWordIndex} />)}
        </div>
    )
}