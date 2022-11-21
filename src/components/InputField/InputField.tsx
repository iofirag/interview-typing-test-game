import React from 'react'
import classes from './InputField.module.css'


interface Props { 
    value: string
    handleKeyEvent: (event: any) => void
    disabled: boolean
}

export default function InputField(props: Props) {
    return (
        <div className={classes.wrapper}>
            <input disabled={props.disabled}
                onChange={(e)=> props.handleKeyEvent(e.target.value)} 
                value={props.value} type="text" placeholder="type the word here" />
        </div>
    )
}