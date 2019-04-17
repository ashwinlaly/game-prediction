var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema(
    {
        name : {type: String, trim: true},
        shortName : {type: String, trim: true},
        logoUrl : {type: String, trim: true},
        teamColour : {type: String, trim: true},
    },
        {timestamps: {} }
);

var teams = mongoose.model('teams',teamSchema);
module.exports = teams;