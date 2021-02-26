const {connect} = require ('mongoose');

const Database = {
    init: (url, options = {})=>{
        options = Object.assign({}, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, options);
        return connect(url, options);
    }
}

module.exports = {Database}