import React, { useContext } from 'react'
import { GlobalContext } from '../../store/GlobalContext';
import classes from './InputField.module.css'


interface Props { 
}

export default function InputField(props: Props) {
    const {inputStr, isInputAvailable, setInputStr} = useContext(GlobalContext);

    return (
        <div className={classes.wrapper}>
            <input disabled={!isInputAvailable}
                onChange={(e)=> setInputStr(e.target.value)}
                value={inputStr} type="text" placeholder="type the word here" />
        </div>
    )
}