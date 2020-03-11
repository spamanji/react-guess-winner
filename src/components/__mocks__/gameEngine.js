import axios from './axios'

function Player({ full_name, imageUrl, score, isWinner }) {
    return { full_name, imageUrl, score, isWinner }
};

const testPlayers = [
    Player({ full_name: 'Test Player1', imageUrl: 'http://testPlayer1.png', score: 10 }),
    Player({ full_name: 'Test Player2', imageUrl: 'http://testPlayer2.png', score: 20 }),
    Player({ full_name: 'Test Player3', imageUrl: 'http://testPlayer3.png', score: 30, isWinner: true })
]

const gameEngine = {

    async getAllPlayers = jest.fn();

    async getGame() {
        return new Promise((resolve, reject) => {
            resolve(testPlayers)
            reject('error');
        })
    }



    //getGame: jest.fn().mockResolvedValue({})
};

export default gameEngine;