import React from 'react';
import classes from './Statistics.module.css';

interface Props {
    timeLeft: number
    correctCpm: number
    correctWpm: number
    lastSeconds: number
    resetGame: () => void
}

export default function Statistics(props: Props) {
    return (
        <div className={classes.wrapper}>
            <div className={classes.item}>Correct CPM: {props.correctCpm}</div>
            <div className={classes.item}>Correct WPM: {props.correctWpm}</div>
            <div className={`${classes.item} ${props.timeLeft < props.lastSeconds && classes.lastSeconds}`}>Time left: {String(props.timeLeft)}</div>
            <input className={classes.item} type="button" value="Restart" onClick={props.resetGame} />
        </div>
    );
}