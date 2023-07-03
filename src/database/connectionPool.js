const Ee = require('events');

//PoolConnection for any database engine
class ConnectionPool extends Ee {

    constructor(config, maxConnections, engine) {
        super();
        this.config = config;
        this.connections = [];
        this.max = maxConnections;
        this.timeOut = 1000;
        this.waiting = [];

        this.engine = engine;
        if (typeof this.engine !== dbEngine) {
            throw new Error('Engine not defined');
            this.engine = null;
        }
    }

    createConnection() {

        const conn = {
            isInUse: true,
            release: () => { this.release(conn) },
            creationTime: Date.now(),
        };

        this.engine.connect(this.config).then((connection) => {
            conn.connection = connection;

        }).catch((err) => {
            console.log(err);
        });

        this.connections.push(conn);
        return conn;
    }

    get() {
        const conn = this.connections.map((conn) => {
            if(conn.creationTime > this.timeOut + Date.now() || conn.isInUse === false)
            {
                conn.connection.end();
                conn.connection = null;
                conn.isInUse = false;
            }
        });

        if (this.connections.length < this.max) {
            const conn = this.createConnection();
            return Promise.resolve(conn);
        }
        else {
            return new Promise
                ((resolve) => {
                    this.waiting.push({ resolve });
                }
                );
        }
    }

    release(connection) {
        connection.isInUse = false;
        const waiting = this.waiting.shift();
        if (waiting) {
            const next = this.createConnection();
            waiting(next);
        }
    }

    getLength() {
        return this.connections.length;
    }

}