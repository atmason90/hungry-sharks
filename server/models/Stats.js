const { Schema } = require('mongoose');

const statsSchema = new Schema({
    games: {
        type: Number,
        default: 0
    },
    wins: {
        type: Number,
        default: 0
    },
    losses: {
        type: Number,
        default: 0
    } 
})

module.exports = statsSchema