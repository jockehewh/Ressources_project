const {connect} = require 'mongoose';

export default class Database {

    /**
     * Init database
     * @param url
     * @param options
     * @returns {Promise | Promise<unknown>}
     */
    static init(url, options = {}){
        options = Object.assign({}, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, options);
        return connect(url, options);
    }
}
