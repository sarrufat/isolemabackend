import * as configuration from '../model/configuration';
import * as logger_manager from '../core/logger/logger-manager';



export class Manager {

    private _configuration: configuration.configuration_module.configuration;
    private _logger: logger_manager.Logger;

    private loadConfiguration(): void {
        this._configuration = require('../configuration/configuration.json');
    }
    public init(): void {
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
      var server = new mongodb.Server('localhost', 27017, [{ auto_reconnect: true }]);
      var db = new mongodb.Db('isomorphic', server, { w: 1 });
    }

    private initLogger(): Promise<void> {
        this._logger = new logger_manager.Logger("isolema.log");
        return this._logger.init();
    }
}
