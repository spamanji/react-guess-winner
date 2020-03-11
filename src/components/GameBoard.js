import React from 'react';
import PlayerCard from './PlayerCard';
import '../styles/moreStyles.css';
import '../styles/newStyles.css';

function GameBoard(props) {
    const playerCards = props.playerCards;

    return <div refs='gallery-container' className='container-fluid gallery-container'>
        <div className='flex-large flex-row'>
            {
                playerCards.map((player, index) => {
                    return <PlayerCard key={index} className='gallery-thumbnail'
                        profile={player} />
                })
            }
        </div>
    </div>
}

export default GameBoard;