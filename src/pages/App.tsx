import React, { useContext } from 'react';
import InputField from '../components/InputField/InputField';
import Statistics from '../components/Statistics/Statistics';
import WordListViewer from '../components/WordListViewer/WordListViewer';
import MyPopup from '../components/Popup/MyPopup';
import { GlobalContext } from '../store/GlobalContext';
import './App.css';

export default function App() {

    const { resetGame, correctChars, errorIndexSet, isModalOpen } = useContext(GlobalContext);

    return (
        <div className="App centered">
            <h1>Typing Speed Test</h1>
            <main>
                <Statistics />
                <WordListViewer />
                <InputField />
            </main>
            <footer>Developed By Ofir Aghai</footer>
            <MyPopup isOpen={isModalOpen} onClose={resetGame}>
                <div>Time is up..</div>
                <div>Correct chars: {correctChars}</div>
                <div>Error words: {errorIndexSet.size}</div>
            </MyPopup>
        </div>
    );
}