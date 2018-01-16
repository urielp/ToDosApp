/**
 * Created by sivanram on 15.1.2018.
 */
var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
   admin: {
        type: Boolean,
        required: true,
    }
});
var User = mongoose.model('User', UserSchema);
module.exports = User;