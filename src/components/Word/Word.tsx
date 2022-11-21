import React from 'react'
import classes from './Word.module.css'

interface Props {
    wordKey: string
    isHighlight: boolean
    isError: boolean
    isCorrect: boolean
}

export default function Word(props: Props) {
    const myRef: any = React.useRef(null);

    React.useEffect(() => {
        if (props.isHighlight) myRef.current.scrollIntoView();
    }, [props]);

    return (
        <div ref={myRef} className={`${classes.wrapper} 
            ${props.isCorrect ? classes.correct : ''} 
            ${props.isError ? classes.error : ''} 
            ${props.isHighlight && classes.highlight}`}>
            {props.wordKey}
        </div>
    )
}