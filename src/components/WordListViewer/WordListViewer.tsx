import React from 'react';
import Word from '../Word/Word';
import classes from './WordListViewer.module.css'

interface Props {
	wordList: string[]
    currWordIndex: number
    errorIndexSet: Set<number>
}

export default function WordListViewer(props: Props) {
    return (
        <div className={classes.grid}>
            {props.wordList.map((word: string, i: number) =>
                <Word key={word} 
                    wordKey={word} 
                    isError={i < props.currWordIndex && props.errorIndexSet.has(i)}
                    isCorrect={i < props.currWordIndex && !props.errorIndexSet.has(i)}
                    isHighlight={i === props.currWordIndex} />)}
        </div>
    )
}