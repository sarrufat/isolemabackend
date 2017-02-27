import * as mongodb from 'mongodb';




/*
var server = new mongodb.Server('localhost', 27017, [{ auto_reconnect: true }]);
var db = new mongodb.Db('isomorphic', server, { w: 1 });
db.open(function() { });
*/
const lemarioCol = 'lemario';



export interface IWord {
    _id: mongodb.ObjectID;
    word: string;
    len: number;
    saoWord: string;
}

export class WordManager {
    private  db: mongodb.Db;
    constructor(appDb: mongodb.Db) {
      this.db = appDb;
    }
    public getWordById(id: string, callback: (word: IWord) => void) {
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
}
