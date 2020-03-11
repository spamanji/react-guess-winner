
function getRandomPlayers(n, allPlayers) {
    if (allPlayers.length !== 0) {
        return allPlayers.sort(() => 0.5 - Math.random()).slice(0, n);
    } else {
        return [];
    }
}

// decide winner among selected using FPPG score
function getWinner(array) {
    return array.sort((a, b) => b.score - a.score)[0];
}

// generate game by randomly picking 3 players, including the winner among them
function getGame(n, allPlayers) {
    let players = getRandomPlayers(n, allPlayers);
    if (players.length < n) {
        throw new Error('Not enough player cards available');
    } else {
        let winner = getWinner(players);
        let finalPlayers = (players.map((player) =>
            player.full_name === winner.full_name ? { ...player, isWinner: true } : player
        )).sort(() => 0.5 - Math.random());
        return finalPlayers;
    }
}

export default getGame;