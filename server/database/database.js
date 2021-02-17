const Sequelize = require('sequelize');
const pkg = require('../../package.json');

const databaseName =
    pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

function getSslConfig (){
    return process.env.NODE_ENV === 'production'
}
const sslConfig = getSslConfig()
console.log(sslConfig)

const db = new Sequelize(
    process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
    // for heroku app db is 'postgresql-curly-60237'
    {
        dialect: 'postgres',
        ssl: sslConfig,
        logging: false,
        dialectOptions: {
            // ssl: {
            //     require: sslConfig,
            //     rejectUnauthorized: false,
            // },
        }
    }
);
module.exports = db;
