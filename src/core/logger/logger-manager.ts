import {error} from "util";
export class Logger{

    private _logger: any;

    constructor (private fileName: string, private rotateFile: boolean = true, private batch: boolean = false) {
        /*var winston = require('winston');
        require('winston-daily-rotate-file');

        var mkdirp = require('mkdirp');


        let filePath = batch ? `./log/batch/${fileName}.log` : `./log/${fileName}.log`;

        var transport = rotateFile ? new winston.transports.DailyRotateFile({
            filename: filePath,
            datePattern: 'yyyy-MM-dd.',
            prepend: true,
            timestamp: true
        }) : new (winston.transports.File)({ filename: filePath, timestamp: true });


        this._logger = new (winston.Logger)({
            transports: [
              new (winston.transports.Console)(),
                transport
            ]
        });

        this._logger.on('error', function (err) { this._logger.addError(err.toString()) });*/
    }
    public init(): Promise<void>{

        return new Promise<void>((resolve, reject) =>{
            var mkdirp = require('mkdirp');
            mkdirp('./log/batch', (error) =>{
                if(error)
                    reject(error);
                else {
                    var winston = require('winston');
                    require('winston-daily-rotate-file');

                    let filePath = this.batch ? `./log/batch/${this.fileName}.log` : `./log/${this.fileName}.log`;

                    var transport = this.rotateFile ? new winston.transports.DailyRotateFile({
                            filename: filePath,
                            datePattern: 'yyyy-MM-dd.',
                            prepend: true,
                            timestamp: true
                        }) : new (winston.transports.File)({ filename: filePath, timestamp: true });


                    this._logger = new (winston.Logger)({
                        transports: [
                            new (winston.transports.Console)(),
                            transport
                        ]
                    });

                    this._logger.on('error', function (err) { this._logger.addError(err.toString()) });
                    resolve();
                }
            });
        });
    }

     public addInfo(message: string, metadata?: any) {

        if (metadata)
            this._logger.info(message, metadata);
        else
            this._logger.info(message);
     }

     public addError(message: string, metadata?: any) {
         if (metadata)
            this._logger.error(message, metadata);
        else
            this._logger.error(message);
     }

    public addLog(message: string, metadata?: any) {
            if (metadata)
            this._logger.log(message, metadata);
        else
            this._logger.log(message);
        }


}
