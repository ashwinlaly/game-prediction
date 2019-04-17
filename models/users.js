var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
        username: { type: String, trim:true },
        email: { type: String, trim:true },
        password: { type: String, trim:true },
        favteam: { type: String, trim:true },
        status: { type: Boolean, default:true }
    },
        { timestamps : {} }
);

var User = mongoose.model('users',UserSchema);
module.exports = User;