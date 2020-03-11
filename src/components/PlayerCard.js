import React, { useContext } from 'react';
import GameContext from '../helpers/gameContext';
import ImageHolder from './ImageHolder';
import ImageHolderClassComp from './ImageHolderClassComp';

function PlayerCard(props) {
    const { full_name, imageUrl, score, isWinner } = props.profile;
    const { processResult, showScore, activateGame } = useContext(GameContext);

    const handleClick = (loaded) => {
        if (activateGame && loaded) {
            if (isWinner && isWinner === true) {
                processResult(true);
            } else {
                processResult(false);
            }
        }
    }

    return (
        <div>
            {/* <ImageHolderClassComp
                key={full_name}
                className={props.className}
                src={imageUrl}
                alt={full_name}
                handleClick={handleClick} /> */}
            <ImageHolder
                key={full_name}
                className={props.className}
                src={imageUrl}
                alt={full_name}
                handleClick={handleClick} />
            <h4>{full_name}</h4>
            {showScore ? <h5>
                FPPG: {score}
            </h5> : null}
        </div>
    )
}

export default PlayerCard;