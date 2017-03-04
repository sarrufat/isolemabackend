import * as mongodb from 'mongodb';




/*
var server = new mongodb.Server('localhost', 27017, [{ auto_reconnect: true }]);
var db = new mongodb.Db('isomorphic', server, { w: 1 });
db.open(function() { });
*/
const lemarioCol = 'hashIsomorphisms';

// const isocatalogCol = 'isocatalog';

const assert = require('assert');

const scalaUtil = require('../scala/isolemautils-fastopt')

export interface IWord {
    _id: mongodb.ObjectID;
    word: string;
    isocode: string;
    isoCount: number;
    saoWord: string;
    mask: string;
}

export interface FreqIsomorph {
    _id: string;
    count: number;
}



export class WordManager {
    private db: mongodb.Db;
    constructor(appDb: mongodb.Db) {
        this.db = appDb;
    }
    public getWordById(id: string, callback: (word: IWord) => void) {
        assert.notStrictEqual(this.db, undefined, "db not defined");
        this.db.collection(lemarioCol, function(error, words: mongodb.Collection) {
            if (error) { console.error(error); return; }
            words.find<IWord>({ _id: new mongodb.ObjectID(id) }).next(function(error, word) {
                if (error) { console.error(error); return; }
                callback(word);
            });
        });
    }
    public getWordLike(likestr: string, callback: (words: IWord[]) => void) {
      var woaWord = scalaUtil.scalaUtil().mapWord(likestr);
        this.db.collection(lemarioCol, function(error, words: mongodb.Collection) {
            if (error) { console.error(error); return; }
            let rexp = RegExp(woaWord);
            words.find<IWord>({ saoWord: rexp }).toArray(function(error, words: IWord[]) {
                if (error) { console.error(error); return; }
                var result2 = words.map( w =>  {
                    w.mask = scalaUtil.Utils().decomposeWordByOccur(w.saoWord);
                    return w;
                });
                callback(result2);
            });
        });
    }
    public getExactWord(sword: string, callback: (words: IWord) => void) {
        this.db.collection(lemarioCol, function(error, words: mongodb.Collection) {
            if (error) { console.error(error); return; }
            ;
            words.find<IWord>({ word: sword }).toArray(function(error, words: [IWord]) {
                if (error) { console.error(error); return; }
                if (words.length > 0)
                    callback(words[0]);
                else {
                    callback(Object.create(null));

                }
            });
        });
    }
    public getIsomorphisms(aword: string, callback: (found: IWord[]) => void) {
        this.getExactWord(aword, (found: IWord) => {
            if (found != null) {
                console.log(found);
                this.db.collection(lemarioCol, function(error, collection: mongodb.Collection) {
                    if (error) { console.error(error); return; }
                    collection.find({ isocode: found.isocode }).toArray(function(error, result: IWord[]) {
                        if (error) { console.error(error); return; }
                        var result2 = result.map( w =>  {
                            w.mask = scalaUtil.Utils().decomposeWordByOccur(w.saoWord);
                            return w;
                        });
                        callback(result2);
                    });
                });
            } else {
                console.log("getExactWord  NOT_FOUND");
                callback(Object.create(null));
            }
        });
    }
    public getStats(callback: (stats: [FreqIsomorph]) => void) {
        var col = this.db.collection(lemarioCol);
        col.aggregate([{ '$project': { 'isocode': 1 } },
        { '$group': { '_id': "$isocode", 'count': { '$sum': 1 } } },
        { '$match': { 'count': {'$gt': 1 }}},
        { '$sort': { count: -1 } }], function(error, result: [FreqIsomorph]) {
            if (error) { console.error(error); return; }
              callback(result);
        });
    }
}
