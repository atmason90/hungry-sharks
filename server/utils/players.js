const players = [];

//Function to add player to game
function addPlayer({id, name, room}) {
    const playersInRoom = players.filter(player => player.room === room);
    const playersInRoomCount = playersInRoom.length;

    if(playersInRoomCount > 1) {
        return {error: "This room is full!"};
    }
    else {
        const newPlayer = {id, name, room};
        players.push(newPlayer);
        return {newPlayer};
    }
}

//Function to remove player by ID
function removePlayer(id) {
    const index = players.findIndex(player => player.id === id);

    if(index >= 0) {
        return players.splice(index, 1)[0];
    }
}

//Function to get player by ID
function getPlayer(id) {
    return players.find(player => player.id === id);
}

//Function to get players by room
function getRoomPlayers(room) {
    return players.filter(player => player.room === room);
}

//Export functions
module.exports = {addPlayer, removePlayer, getPlayer, getRoomPlayers};