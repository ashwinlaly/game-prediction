var mongoose = require('mongoose');
var Scheme = mongoose.Schema;

var gameSchema = new Scheme({
        hometeam: {
            isBatting : {type: Boolean },
            id : {type: Scheme.Types.ObjectId, path: 'teams', required:true },
            hometeamscore: {type: Number, required: true}
        },
        awayteam: {
            isBatting : {type: Boolean },
            id : {type: String, required:true },
            awayteamscore: {type: Number, required: true}
        },
        venue: {
            name : {type: String, trim: true},
            shortName : {type: String, trim: true}
        },
        status: {type: Boolean, default:true},
        isMatchDrawn : { type: Boolean, default: false },
        winningTeamId : { type: String, default:0 },
        startDateTime : { type: Date, default: Date.now() },
        endDateTime : { type: Date,  default: Date.now() }
    },
        {timestamps: {} }
);

var Games = mongoose.model('games',gameSchema);
module.exports = Games;