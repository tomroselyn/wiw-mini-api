const pg = require('pg');
const url = require('url');
let config = {};

if (process.env.DATABASE_URL) {
    //heroku config
    let params = url.parse(process.env.DATABASE_URL);
    let auth = params.auth.split(':');
    config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true,
        max: 10,
        idleTimeoutMillis: 30000
    };
} else {
    config = {
        //local config
        user: process.env.PG_USER || null,
        password: process.env.DATABASE_SECRET || null,
        host: process.env.DATABASE_SERVER || 'localhost',
        port: process.env.DATABASE_PORT || 5432,
        database: process.env.DATABASE_NAME || 'wheniwork_mini_api',
        max: 10,
        idleTimeoutMillis: 30000,
    };
}

module.exports = new pg.Pool(config);