"use strict";
var mongodb = require("mongodb");
var server = new mongodb.Server('localhost', 27017, [{ auto_reconnect: true }]);
var db = new mongodb.Db('isomorphic', server, { w: 1 });
db.open(function () { });
var lemarioCol = 'lemario';
function getWordById(id, callback) {
    db.collection(lemarioCol, function (error, words) {
        if (error) {
            console.error(error);
            return;
        }
        words.find({ _id: new mongodb.ObjectID(id) }).next(function (error, word) {
            if (error) {
                console.error(error);
                return;
            }
            callback(word);
        });
    });
}
exports.getWordById = getWordById;
function getWordLike(likestr, callback) {
    db.collection(lemarioCol, function (error, words) {
        if (error) {
            console.error(error);
            return;
        }
        var rexp = RegExp(likestr);
        words.find({ word: rexp }).toArray(function (error, words) {
            if (error) {
                console.error(error);
                return;
            }
            callback(words);
        });
    });
}
exports.getWordLike = getWordLike;
