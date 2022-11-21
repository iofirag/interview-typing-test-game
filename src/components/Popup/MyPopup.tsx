import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './MyPopup.css'

interface Props {
    isOpen: boolean;
    errorWords: number;
    correctChars: number;
    children?: any;
    onClose: () => void;
}

export default function MyPopup(props: Props) {
    return (
        <Popup onClose={props.onClose} open={props.isOpen} position="center center">
            <div>Time is up..</div>
            <div>Correct chars: {props.correctChars}</div>
            <div>Error words: {props.errorWords}</div>
        </Popup>
    )
}