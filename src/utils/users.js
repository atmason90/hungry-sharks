const players = [];

//Function to add user to game
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

//Function to remove user
function removePlayer(id) {
    const index = players.findIndex(player => player.id === id);

    if(index >= 0) {
        return players.splice(index, 1)[0];
    }
}