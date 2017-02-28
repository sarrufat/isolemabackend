import * as configuration from '../model/configuration';
import * as logger_manager from '../core/logger/logger-manager';
import * as mongodb from 'mongodb';
import {WordManager} from '../model/IWord';
import {wordManager} from '../routes/IsolemaRouters';


var Promise = require('bluebird');



export class Manager {
    private static _instance: Manager;
    private server: mongodb.Server;
    private db: mongodb.Db;
    private wordManager: WordManager;

    private _configuration: configuration.configuration_module.configuration;
    private _logger: logger_manager.Logger;

    private loadConfiguration(): void {
        this._configuration = require('../configuration/configuration.json');
    }
    public init(): void {
        Manager._instance = this;
        this.initLogger()
            .then(() => {
                //    this.initProcess();

                this._logger.addInfo("inicialitzant i parametritzant servei...");
                this.loadConfiguration();
                this.initDatabase();
            });

    }
    private initDatabase(): void {
        var mongodb = require("mongodb");
        this.server = new mongodb.Server('localhost', 27017, [{ auto_reconnect: true }]);
        this.db = new mongodb.Db('isomorphic', this.server, { w: 1 });
        this.db.open(function() { });
    }

    private initLogger(): Promise<void> {
        this._logger = new logger_manager.Logger("isolema.log");
        return this._logger.init();
    }

    private exitHandler(options: any, err: any, that: any) {

        if (options.exit) process.exit();

        //if (err)  this._logger.addError("HIGH ERROR:"  + err.stack);

        if (that._mongoConnection) {
            that._mongoConnection.closeDatabase().then(() => {
                if (options.exit) process.exit();
            });
        }
    }
    public getWordManager() {
        if( this.wordManager == null) {
          console.log("instantiating WordManager: " + this.db );
          this.wordManager = new WordManager(this.db);
        }
        return this.wordManager;
    }
     public static getInstance() : Manager {
       return Manager._instance;
     }
}
