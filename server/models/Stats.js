const { Schema } = require('mongoose');

const statsSchema = new Schema({
    result: {
        type: Boolean
    },
    scoreCount : {
        type: Number
    } 

})

module.exports = statsSchema