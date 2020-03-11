import React from 'react'
import '../styles/newStyles.css';

function ResultAlert(props) {

    const { showAlert, contentMessage, confirmButtonText } = props.alertProps;

    const handleConfirm = (event) => {
        event.preventDefault();
        if (confirmButtonText === 'Play something else') {
            props.showMeMore();
        } else {
            props.restartGame();
        }
    }

    if (showAlert) {
        return (
            <div className='popup'>
                <div className='popup\_inner'>
                    <h3>{contentMessage}</h3>
                    <button onClick={handleConfirm}>{confirmButtonText}</button>
                </div>
            </div>
        )
    }
    return <div></div>;
}

export default ResultAlert;