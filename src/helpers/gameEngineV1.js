import axios from 'axios';

const gameEngineV1 = {

    // get all players from source
    async getAllPlayers() {
        let url = 'https://gist.githubusercontent.com/liamjdouglas/bb40ee8721f1a9313c22c6ea0851a105/raw/6b6fc89d55ebe4d9b05c1469349af33651d7e7f1/Player.json'
        let result = await axios.get(url)
            .then(response => response.data)
            .then(data => data.players);

        let finalResult = result.map((player) => {
            return {
                full_name: player.first_name + ' ' + player.last_name,
                imageUrl: player.images.default.url,
                score: player.fppg ? player.fppg.toFixed(2) : 0
            }
        })
        return finalResult;
    },

    // get 'n' random players out of all players
    async getRandomPlayers(n) {
        let allPlayers = await this.getAllPlayers();
        let randomPlayers = allPlayers.sort(() => 0.5 - Math.random()).slice(0, n);
        return randomPlayers;
    },

    // decide winner among selected using FPPG score
    getWinner(array) {
        return array.sort((a, b) => b.score - a.score)[0];
    },

    // generate game by randomly picking 3 players, including the winner among them
    async getGame() {
        let players = await this.getRandomPlayers(3);
        let winner = this.getWinner(players);
        let finalPlayers = (players.map((player) =>
            player.full_name === winner.full_name ? { ...player, isWinner: true } : player
        )).sort(() => 0.5 - Math.random());
        return finalPlayers;
    }

}

export default gameEngineV1;