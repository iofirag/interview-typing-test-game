import React from 'react'
import classes from './Word.module.css'

interface Props {
    wordKey: string
    isHighlight: boolean
    isError: boolean
    isCorrect: boolean
    userInput: string
}

export default function Word(props: Props) {
    const myRef: any = React.useRef(null);

    React.useEffect(() => {
        if (props.isHighlight) myRef.current.scrollIntoView();
    }, [props]);

    return (
        <div>
            {props.isHighlight ?
                <div ref={myRef} className={`${classes.wrapper} ${classes.highlight}`}>
                    {
                        props.wordKey.split('').map((ch, i) => {
                            if (props.userInput.length > i) {
                                // error / correct char
                                return <span className={props.wordKey[i] === props.userInput[i] ? classes.correct : classes.error} key={i}>{ch}</span>
                            } else {
                                // normal char
                                return <span key={i}>{ch}</span>
                            }
                        })
                    }
                </div>
                :
                <div ref={myRef} className={`${classes.wrapper}
                    ${props.isCorrect ? classes.correct : ''} 
                    ${props.isError ? classes.error : ''} `}>
                    {props.wordKey}
                </div>
            }
        </div>
    )
}