var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.connect("mongodb://XXX:XXX@aws-us-east-1-portal.11.dblayer.com:27781/liaoyuan");
autoIncrement.initialize(connection);

var longToShortSchema = new Schema({

    longURL:String,
    shortURL:String

});

longToShortSchema.pre("save", function(next){

    next();

});

longToShortSchema.plugin(autoIncrement.plugin, 'LongToShort');
var LongToShort = connection.model("LongToShort", longToShortSchema);
module.exports = LongToShort;