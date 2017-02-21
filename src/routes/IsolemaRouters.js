"use strict";
var express_1 = require("express");
var WordRepository = require("../model/IWord");
var HTTPSTATUS = require("http-status");
var IsolemaRouter = (function () {
    function IsolemaRouter() {
        this.router = express_1.Router();
        this.init();
    }
    IsolemaRouter.prototype.init = function () {
        this.router.get('/word/:id', this.getOne);
        this.router.get('/wordLike/:query', this.getWordLike);
    };
    IsolemaRouter.prototype.getOne = function (req, res, next) {
        var query = req.params.id;
        console.log("id = " + req.params.id);
        WordRepository.getWordById(query, function (word) {
            if (word) {
                console.log("word = " + word.word);
                res.status(200).send({ message: 'Success', status: res.status, word: word });
            }
            else {
                res.status(404).send({ message: 'No word found', status: res.status });
            }
        });
    };
    IsolemaRouter.prototype.getWordLike = function (req, res, next) {
        var query = req.params.query;
        if (query && query.length > 3) {
            console.log("query = " + req.params.query);
            WordRepository.getWordLike(query, function (words) {
                if (words) {
                    res.status(HTTPSTATUS.OK).send({ message: 'Success', status: res.status, words: words });
                }
                else {
                    res.status(HTTPSTATUS.NOT_FOUND).send({ message: 'No word found', status: res.status });
                }
            });
        }
        else {
            res.status(HTTPSTATUS.NOT_BAD_REQUEST).send({ message: HTTPSTATUS[400], status: res.status });
        }
    };
    return IsolemaRouter;
}());
exports.IsolemaRouter = IsolemaRouter;
var heroRoutes = new IsolemaRouter();
heroRoutes.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = heroRoutes.router;
