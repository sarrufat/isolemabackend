import * as mongodb from 'mongodb';




/*
var server = new mongodb.Server('localhost', 27017, [{ auto_reconnect: true }]);
var db = new mongodb.Db('isomorphic', server, { w: 1 });
db.open(function() { });
*/
const lemarioCol = 'lemarioWNumISOS';

const isocatalogCol = 'isocatalog';

const assert = require('assert');


export interface IWord {
    _id: mongodb.ObjectID;
    word: string;
    len: number;
    saoWord: string;
    isoCount: number;
}

export interface ISOWord {
    word: string;
    isword: string;
    mapping: string;
    smapping: string;
}

export class WordManager {
    private db: mongodb.Db;
    constructor(appDb: mongodb.Db) {
        this.db = appDb;
    }
    public getWordById(id: string, callback: (word: IWord) => void) {
      assert.notStrictEqual(this.db , undefined, "db not defined");
        this.db.collection(lemarioCol, function(error, words: mongodb.Collection) {
            if (error) { console.error(error); return; }
            words.find<IWord>({ _id: new mongodb.ObjectID(id) }).next(function(error, word) {
                if (error) { console.error(error); return; }
                callback(word);
            });
        });
    }
    public getWordLike(likestr: string, callback: (words: [IWord]) => void) {
        this.db.collection(lemarioCol, function(error, words: mongodb.Collection) {
            if (error) { console.error(error); return; }
            let rexp = RegExp(likestr);
            words.find<IWord>({ saoWord: rexp }).toArray(function(error, words: [IWord]) {
                if (error) { console.error(error); return; }
                callback(words);
            });
        });
    }
    public getIsomorphisms(aword: string, callback: (found: [ISOWord]) => void) {
        this.db.collection(isocatalogCol, function(error, collection: mongodb.Collection) {
            if (error) { console.error(error); return; }
            collection.find({word: aword}).toArray(function(error, result:[ISOWord]) {
              if (error) { console.error(error); return; }
              callback(result);
            });
        });
    }
}
