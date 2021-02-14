const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
var favicon = require('serve-favicon');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./database');
const sessionStore = new SequelizeStore({ db });
const PORT = process.env.PORT || 8080;
const app = express();
const socketio = require('socket.io');
module.exports = app;

const createApp = () => {
    // logging middleware
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // compression middleware
    app.use(compression());

    // api routes
    app.use('/api', require('./api'));

    // favicon
    app.use(favicon(path.join(__dirname, '..', 'src', 'public', 'favicon.ico')));
    // static file-serving middleware
    app.use(express.static(path.join(__dirname, '..', 'src', 'public','pages')));
    // static css files
    app.use(express.static(path.join(__dirname, '..', 'src', 'public','styles')));
    // js files
    app.use(express.static(path.join(__dirname, '..', 'src')));
    // dependencies
    app.use(express.static(path.join(__dirname, '..', 'node_modules')));

    // error handling endware
    app.use((err, req, res, next) => {
        console.error(err);
        console.error(err.stack);
        res.status(err.status || 500).send(
            err.message || 'Internal server error.'
        );
    });
};

const startListening = () => {
    // start listening (and create a 'server' object representing our server)
    const server = app.listen(PORT, () =>
        console.log(`Mixing it up on port ${PORT}`)
    );

    // set up our socket control center
    const io = socketio(server);
    require('./socket')(io);
};

const syncDb = () => db.sync();

async function bootApp() {
    await sessionStore.sync();
    await syncDb();
    await createApp();
    await startListening();
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
    bootApp();
} else {
    createApp();
}
