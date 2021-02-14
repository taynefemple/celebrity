const Sequelize = require('sequelize');
const pkg = require('../../package.json');

const databaseName =
    pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

const db = new Sequelize(
    process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
    // for heroku app db is 'postgresql-curly-60237'
    {
        dialect: 'postgres',
        protocol: 'postgres',
        ssl: process.env.DB_ENABLE_SSL,
        dialectOptions: {
            ssl: process.env.DB_ENABLE_SSL && {
                require: true
            }
        },
        logging: false,
    }
);
module.exports = db;
