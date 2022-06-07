const { Schema } = require('mongoose');

const statsSchema = new Schema({
    games: {
        type: Number
    },
    wins: {
        type: Number
    },
    losses: {
        type: Number
    } 
})

module.exports = statsSchema