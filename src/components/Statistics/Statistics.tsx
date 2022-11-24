import React, { useContext } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import classes from './Statistics.module.css';

interface Props {

}

export default function Statistics(props: Props) {
    const {resetGame, correctChars, errorIndexSet, remaningTimeMilis, config} = useContext(GlobalContext);

    const timeLeft = remaningTimeMilis / 1000

    return (
        <div className={classes.wrapper}>
            <div className={classes.item}>Correct CPM: {correctChars}</div>
            <div className={classes.item}>Error WPM: {errorIndexSet.size}</div>
            <div className={`${classes.item} ${timeLeft < config.lastSeconds && classes.lastSeconds}`}>
                Time left: {timeLeft > config.lastSeconds ? Math.round(timeLeft) : timeLeft.toFixed(1)}
            </div>
            <input className={classes.item} type="button" value="Restart" onClick={resetGame} />
        </div>
    );
}