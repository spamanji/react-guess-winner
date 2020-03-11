import axios from 'axios';

async function apiCall() {
    let url = 'https://gist.githubusercontent.com/liamjdouglas/bb40ee8721f1a9313c22c6ea0851a105/raw/6b6fc89d55ebe4d9b05c1469349af33651d7e7f1/Player.json'
    let result = await axios.get(url)
        .then(response => response.data)
        .then(data => data.players);
    return result;
}

export default async function getModifiedPlayers() {
    let rawResult = await apiCall();
    return rawResult.filter(player => player.fppg).map((player) => {
        return {
            full_name: player.first_name + ' ' + player.last_name,
            imageUrl: player.images.default.url,
            score: player.fppg ? player.fppg.toFixed(2) : 0
        }
    });
};