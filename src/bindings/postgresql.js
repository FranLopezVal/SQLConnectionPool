
const { Client }  = require ('pg');
const dbEngine = require('./dbEngine');


//It is only prototype, not tested yet
class psqlEngine extends dbEngine
{
    dbName = 'postgres';
    autoCommit = true;
    dbPassword = 'postgres';
    dbHost = 'localhost';
    dbPort = 5432;
    config = null;

    client = null;

    constructor()
    {
        super();
    }

    connect(config)
    {

        this.config = config;
        this.dbName = config.dbName;
        this.dbPassword = config.dbPassword;
        this.dbHost = config.dbHost;
        this.dbPort = config.dbPort;
        this.dbConnstring = `postgres://${config.user}:${config.password}@${config.host}`;

        this.client = new Client({
            user: this.dbName,
            host: this.dbHost,
            database: this.dbName,
            password: this.dbPassword,
            port: this.dbPort,
        });

        client.connect();
        return client;
    }

    disconnect()
    {
        this.client.end();       
        
    }

    query(query)
    {
        return this.client.query(query);
    }

    getLength()
    {
        return this.client.getLength();
    }

    get()
    {
        return this.client;
    }

    release(connection)
    {
        this.client.release(connection);
    }   
    
}