import { newEnforcer }from 'casbin';
import { SequelizeAdapter } from 'casbin-sequelize-adapter';
import { host, portNumber, databaseUserName, databasePassword, databaseName } from '../constants/constants';
import {} from '../'

async function dbInstance() {
    const dbConnection = await SequelizeAdapter.newAdapter({
        host: host,
        port: parseInt(portNumber),
        username: databaseUserName,
        password: databasePassword,
        database: databaseName,
        dialect: 'mysql',
    });
    return await newEnforcer(process.cwd() + 'basic_model.conf', dbConnection)
}

export default dbInstance();