//Binding to the database engine like mysql, postgres, etc.
class dbEngine extends dbEngineModel
{
    autoCommit = true;

    constructor()
    {
    }

    connect(config)
    {                
        this.config = config;
        throw new Error('Not implemented');
    }
    disconnect()
    {
        throw new Error('Not implemented');
    }

    query(query)
    {
        throw new Error('Not implemented');
    }

    getLength()
    {
        throw new Error('Not implemented');
    }


}