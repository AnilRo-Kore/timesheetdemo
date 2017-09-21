var bootstrap = require("./bootstrap.js");
var assert = require('assert');
var url = "mongodb://localhost:27017/TeamB";
// var url = "mongodb://52.71.161.217:27017/TeamB";

var debug = require('debug')('DBManager');

function getConnection(callback) {
    global.MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        debug("Connected correctly to server");
        if (err)
            throw err;
        callback(db);
    });
}

module.exports.getConnection = getConnection;
