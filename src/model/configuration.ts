
export module configuration_module {
    export interface database {
        connection: string;
        port: string;
        operationTimeout: number;
        maxRecordsByQuery: number;
    }

    export interface configuration {
        database: database;
    }
}
