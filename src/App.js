"use strict";
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var IsolemaRouters_1 = require("./routes/IsolemaRouters");
var App = (function () {
    function App() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    App.prototype.middleware = function () {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    };
    App.prototype.routes = function () {
        var router = express.Router();
        router.get('/', function (req, res, next) {
            res.json({
                message: 'Hola Mundo!'
            });
        });
        this.express.use('/', router);
        this.express.use('/api/v1/isolema', IsolemaRouters_1.default);
    };
    return App;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new App().express;
