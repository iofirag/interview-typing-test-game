import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './MyPopup.css'

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children?: any;
}

export default function MyPopup (props: Props) {
    return (
        <Popup onClose={props.onClose} open={props.isOpen} position="center center">
            {props.children}
        </Popup>
    )
}