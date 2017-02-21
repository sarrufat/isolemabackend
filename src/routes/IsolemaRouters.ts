import { Router, Request, Response, NextFunction } from 'express';
import * as WordRepository from '../model/IWord'
import * as HTTPSTATUS from 'http-status';


export class IsolemaRouter {
    router: Router

    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

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
    }
    public getOne(req: Request, res: Response, next: NextFunction) {
        let query = req.params.id;
        console.log(`id = ${req.params.id}`);
        WordRepository.getWordById(query, function(word: WordRepository.IWord) {
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
            WordRepository.getWordLike(query, function(words: [WordRepository.IWord]) {
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
}

// Create the HeroRouter, and export its configured Express.Router
const heroRoutes = new IsolemaRouter();
heroRoutes.init();

export default heroRoutes.router;
