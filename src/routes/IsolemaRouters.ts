import { Router, Request, Response, NextFunction } from 'express';
import  {WordManager,IWord,ISOWord} from '../model/IWord'
import * as HTTPSTATUS from 'http-status';
import {Manager} from '../application/application-module';


export class IsolemaRouter {
    router: Router
  //  appManager:Manager;
    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

  //  public setAppManager() {
    //  this.appManager = Manager.getInstance();
    //  console.log( `this.appManage = ${this.appManager}`);
  //  }

    /**
     * GET all Heroes.
     */
    /*  public getAll(req: Request, res: Response, next: NextFunction) {
          res.send(Heroes);
      }*/

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        //  this.router.get('/', this.getAll);
        this.router.get('/word/:id', this.getOne);
        this.router.get('/wordLike/:query', this.getWordLike);
        this.router.get('/isomorphisms/:query', this.getIsomorphisms);

    }
    public getOne(req: Request, res: Response, next: NextFunction) {
        let query = req.params.id;
        console.log(`id = ${req.params.id}`);
        Manager.getInstance().getWordManager().getWordById(query, function(word: IWord) {
            if (word) {
                console.log(`word = ${word.word}`);
                res.status(200).send({ message: 'Success', status: res.status, word });
            } else {
                res.status(404).send({ message: 'No word found', status: res.status });
            }
        });
    }

    public getWordLike(req: Request, res: Response, next: NextFunction) {
        let query = req.params.query;
        if (query && query.length > 3) {
            console.log(`query = ${req.params.query}`);
              Manager.getInstance().getWordManager().getWordLike(query, function(words: [IWord]) {
                if (words) {
                    res.status(HTTPSTATUS.OK).send({ message: 'Success', status: res.status, words });
                } else {
                    res.status(HTTPSTATUS.NOT_FOUND).send({ message: 'No word found', status: res.status });
                }
            });
        } else {
            res.status(HTTPSTATUS.NOT_BAD_REQUEST).send({ message: HTTPSTATUS[400], status: res.status });
        }
    }

    public getIsomorphisms(req: Request, res: Response, next: NextFunction) {
        let query = req.params.query;
        if (query) {
            console.log(`query = ${req.params.query}`);
              Manager.getInstance().getWordManager().getIsomorphisms(query, function(result: [ISOWord]) {
                if (result) {
                    res.status(HTTPSTATUS.OK).send({ message: 'Success', status: res.status, result });
                } else {
                    res.status(HTTPSTATUS.NOT_FOUND).send({ message: 'No word found', status: res.status });
                }
            });
        } else {
            res.status(HTTPSTATUS.NOT_BAD_REQUEST).send({ message: HTTPSTATUS[400], status: res.status });
        }
    }
}

// Create the HeroRouter, and export its configured Express.Router
  export const wordManager= new IsolemaRouter();
  wordManager.init();

  export default wordManager.router;
