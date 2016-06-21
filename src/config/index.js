let env = process.env.NODE_ENV || "development";

let config = {};

switch(env) {
    case "development":
            config = require('./development.config');
        break;
    case "test":
            config = require('./test.config');
        break;
    case "production":
            config = require('./production.config');
        break;
}

module.exports = config;